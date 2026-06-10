function signUp() {

	return (
		<div>
			<div>
				<h2>Sign up</h2>
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
						<label htmlFor="user_password_cfm">Confirm password :</label>
						<input type="password" name="user_password_cfm" id="user_password_cfm" />
					</div>
					<div>
						<label htmlFor="firstname">Firstname: </label>
						<input type="text" name="firstname" id="firstname" />
					</div>
					<div>
						<label htmlFor="lastname">Lastname: </label>
						<input type="text" name="lastname" id="lastname" />
					</div>
					<div>
						<button>Sign up</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default signUp