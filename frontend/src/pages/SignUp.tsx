import { useState } from "react";
import { validateEmail, validatePassword, validateUsername } from "../sanitizer/validateUser";
import { sanitizeEmail, sanitizePassword, sanitizeUsername } from "../sanitizer/sanitaizer";
import axios from "axios";

function SignUp() {
	const [uname, setUname] = useState("")
	const [uEmail, setUEmail] = useState("")
	const [uPwd, setUPwd] = useState("")
	const [uPwdCfm, setUPwdCfm] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")

	const [errors, setErrors] = useState<String []> ([])


	async function handleSignUp(e: any) {
		e.preventDefault()
		
		const newErrors: string[] = [];
		if (!uname || !uEmail || !uPwd || !uPwdCfm || !firstName || !lastName) {
			setErrors(["Fields could not be empty."])
			return
		}

		if (uPwd !== uPwdCfm) {
			newErrors.push("Passwords do not match.");
		}

		newErrors.push(
			...validateUsername(uname),
			...validateEmail(uEmail),
			...validatePassword(uPwd, uname, uEmail)
		)

		if (newErrors.length > 0) {
			setErrors(newErrors)
			return
		}
		setUname("")
		setUEmail("")
		setUPwd("")
		setUPwdCfm("")
		setFirstName("")
		setLastName("")
		setErrors([])
		
		const username = sanitizeUsername(uname)
		const u_email = sanitizeEmail(uEmail)
		const u_password = sanitizePassword(uPwd)

		try {
			await axios.post('users/register',
				{
					username,
					u_email,
					u_password,
					firstName,
					lastName,
				}
			)
		} catch (err: any) {
			setErrors([`${err.reponse.status} : ${err.reponse.data}`])
		}
	}
	return (
		<div>
			<div>
				<h2>Sign up</h2>
				<form>
					<div>
						<label htmlFor="username">Username: </label>
						<input type="text" name="username" id="username"
							value={uname} onChange={(e)=>setUname(e.target.value)}/>
					</div>
					<div>
						<label htmlFor="email">Email: </label>
						<input type="email" name="email" id="email"
							value={uEmail} onChange={(e)=>setUEmail(e.target.value)}/>
					</div>
					<div>
						<label htmlFor="user_password">Password :</label>
						<input type="password" name="user_password" id="user_password"
							value={uPwd} onChange={(e)=>setUPwd(e.target.value)}/>
					</div>
					<div>
						<label htmlFor="user_password_cfm">Confirm password :</label>
						<input type="password" name="user_password_cfm" id="user_password_cfm"
							value={uPwdCfm} onChange={(e)=>setUPwdCfm(e.target.value)}/>
					</div>
					<div>
						<label htmlFor="firstname">Firstname: </label>
						<input type="text" name="firstname" id="firstname" 
							value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
					</div>
					<div>
						<label htmlFor="lastname">Lastname: </label>
						<input type="text" name="lastname" id="lastname"
							value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
					</div>setErrors
					<div>
						{errors.length > 0
							? errors.map((e, i)=>(<p key={i}>{e}</p>))
							: ""
						}
					</div>
					<div>
						<button onClick={handleSignUp}>Sign up</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignUp