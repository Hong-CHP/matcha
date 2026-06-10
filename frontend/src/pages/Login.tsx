import { useState } from "react";
import { Link } from "react-router-dom"

function Login() {
	const [uname, setUname] = useState<String>("")
	const [uPwd, setUPwd] = useState<String>("")
	async function handleSignIn(e: any) {
		e.preventDeault();

		

	}

	return (
		<div>
			<div>
				<h2>Sign in</h2>
				<form>
					<div>
						<label htmlFor="username">Username or email: </label>
						<input type="text" name="username" id="username" />
					</div>
					<div>
						<label htmlFor="user_password">Password :</label>
						<input type="password" name="user_password" id="user_password" />
					</div>
					<div>
						<button onClick={handleSignIn}>Sign in</button>
					</div>
				</form>
				<div>
					<Link to='signUp'>
						<p>A new experience? Sign up a account</p>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Login