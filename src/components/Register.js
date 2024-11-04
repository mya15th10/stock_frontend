import React from 'react';
import '../styles/register.css';

function RegisterForm() {
	return (
		<div className="register-page">
			{/* Header o day */}
			<div className="registerContainer">

				<form className="registerForm">

					<h1 className="formTitle">REGISTER</h1>

					<div className="inputGroup">
						<label htmlFor="email" className="visually-hidden">Email</label>
						<input type="email" id="email" placeholder="Email" className="inputFrame" required />
					</div>

					<div className="inputGroup">
						<label htmlFor="username" className="visually-hidden">Username</label>
						<input type="text" id="username" placeholder="Username" className="inputFrame" required />
					</div>

					<div className="inputGroup">
						<label htmlFor="password" className="visually-hidden">Password</label>
						<input type="password" id="password" placeholder="Password" className="inputFrame" required />
					</div>

					<div className="inputGroup">
						<label htmlFor="confirmPassword" className="visually-hidden">Re-enter password</label>
						<input type="password" id="confirmPassword" placeholder="Re-enter password" className="inputFrame" required />
					</div>

					<button type="submit" className="registerButton"><b>Register</b></button>

					
				</form>

			</div>

		</div>
	);
}

export default RegisterForm;