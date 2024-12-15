import "../style/signup.css"

import SuccessIcon from "../assets/signup/success.svg"

import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { MyContext } from "./Context";
import { useContext, useEffect, useState } from "react";

function Signup() {
	// Set order of component on Navbar
    const { setOrder } = useContext(MyContext);
	useEffect(() => {
        setOrder(5);
    }, [])

	const { t } = useTranslation("signup");

	const [error, setError] = useState(0);
	const [success, setSuccess] = useState(false);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	}

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	}

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	}

	const handleRePasswordChange = (event) => {
		setRePassword(event.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		// console.log(email);
		// console.log(username);
		// console.log(password);
		// console.log(rePassword);

		if(password !== rePassword) {
			setError(4);
			return;
		} 

		const signUpData = {
			username: username,
			email: email,
			password: password,
		}

		const url = "http://localhost:8080/auth/signup"
		fetch(url, {
			method: "POST",
            headers: {'Content-Type' : "application/json"},
			credentials: 'include',
            body: JSON.stringify(signUpData)
		})
		.then(res => {
			if(!res.ok) 
				return res.json();
			else {
				setSuccess(true);
				setError(0);
			}
				
		})
			.then(e => {
				if(e.error === "email existed") {
					console.log("Email existed");
					setError(1);
				}
				else if(e.error === "username existed") {
					console.log("username exitsted");
					setError(2);
				}
				
			})
		.catch(e => console.log())

	}

	const navigate = useNavigate()
	
	return (
		<div className="signup-page">
			{/* <Navbar /> */}

			<div className={success ? "signup-success": "signup-non-success"}>
				<div className="signup-success-container">
					<img alt="" src={SuccessIcon}></img>
					<h2>{t("SUCCESS")}</h2>
					<p>{t("Account signed up successfully")}</p>
					<div onClick={() => navigate("/login")} className="signup-success-btn">
						<p>{t("continue")}</p>
					</div>
				</div>
			</div>

			<div className="signup-section">
				<div className="signup-container">
					<h2 className="signup-title">{t("signup-title")}</h2>

					<form className="signup-form">
						<div className="signup-input-frame">
                        	<input onChange={handleEmailChange} type="email" placeholder={t("email-placeholder")}></input>
							<p className={error === 1? "" : "error-hidden"}>Email existed</p>
                    	</div>
						<div className="signup-input-frame">
                        	<input onChange={handleUsernameChange} type="text" placeholder={t("username-placeholder")}></input>
							<p className={error === 2? "" : "error-hidden"}>Username existed</p>
                    	</div>
						<div className="signup-input-frame">
                        	<input onChange={handlePasswordChange} type="password" placeholder={t("password-placeholder")}></input>
                    	</div>
						<div className="signup-input-frame">
                        	<input onChange={handleRePasswordChange} type="password" placeholder={t("re-password-placeholder")}></input>
							<p className={error === 4? "" : "error-hidden"}>{t("Password not match")}</p>
                    	</div>

						<button onClick={handleSubmit} className="signup-button" type="submit">{t("signup-btn")}</button>

						<Link className="back-login" to="/login">{t("back-login")}</Link>
					</form>
				</div>

			</div>
		</div>
	);
}

export default Signup;