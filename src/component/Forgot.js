import "../style/forgot.css"

import SuccessIcon from "../assets/signup/success.svg"

import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { MyContext } from "./Context";
import { useContext, useEffect, useState } from "react";

function Forgot() {
    // Set order of component on Navbar
    const { setOrder } = useContext(MyContext);
    useEffect(() => {
        setOrder(5);
    }, [])

    const navigate = useNavigate();

    const { t } = useTranslation("forgot")

    const [error, setError] = useState(false);
    const [stage, setStage] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleRePasswordChange = (event) => {
        setRePassword(event.target.value);
    }

    const handEmailSubmit = (event) => {
        event.preventDefault();

        const emailData = {
            email: email
        }

        const url = "http://localhost:8080/auth/forgot"
        fetch(url, {
            method: "POST",
            headers: {'Content-Type' : "application/json"},
            credentials: 'include',
            body: JSON.stringify(emailData)
        })
        .then(res => {
            if(res.ok) {
                setError(false);
                setStage(2);
            } else {
                setError(true);
            }
        })
        .catch(e => {console.log(e)})
    }

    const handleOtpSubmit = (event) => {
        event.preventDefault();

        const OtpData = {
            email: email,
            otp: otp
        }

        const url = "http://localhost:8080/auth/forgot/otp"
        fetch(url, {
            method: "POST",
            headers: {'Content-Type' : "application/json"},
            credentials: 'include',
            body: JSON.stringify(OtpData)
        })
        .then(res => {
            if(res.ok) {
                setError(false);
                setStage(3);
            } else {
                setError(true);
            }
        })
        .catch(e => console.log(e));
    }

    const handleNewPasswordSubmit = (event) => {
        event.preventDefault();

        if(password !== rePassword) {
            setError(true);
            return;
        }

        const NewPasswordData = {
            email: email,
            password: password
        }

        const url = "http://localhost:8080/auth/forgot/reset"
        fetch(url, {
            method: "POST",
            headers: {'Content-Type' : "application/json"},
            credentials: 'include',
            body: JSON.stringify(NewPasswordData)
        })
        .then(res => {
            if(res.ok) {
                setError(false);
                setStage(4);
            } else {

            }
        })
        .catch(e => console.log(e));
    }

    return (
        <div id="forgot-page">
            {/* <Navbar /> */}

            <div className={stage === 4 ? "forgot-success": "forgot-non-success"}>
				<div className="forgot-success-container">
					<img alt="" src={SuccessIcon}></img>
					<h2>SUCCESS</h2>
					<p>message</p>
					<div onClick={() => navigate("/login")} className="forgot-success-btn">
						<p>Continue</p>
					</div>
				</div>
			</div>

            <div className="forgot-section">
                
                <div className={`forgot-container ${stage !== 1 ? "hidden" : ""}`}>
                    <h2 className="forgot-title">{t("password-reset")}</h2>

                    <form className="forgot-form">
                        <div className="forgot-input-frame">
                            <label htmlFor="email-forgot">{t("instruction-label")}</label>
                        	<input onChange={handleEmailChange} type="email" id="email-forgot" placeholder="Email"></input>
                            <p className={error === true ? "forgot-error" : "forgot-error-hidden"}>Email not exist</p>
                    	</div>
                        <button onClick={handEmailSubmit} className="forgot-button" type="submit">{t("reset-btn")}</button>
                        <hr className="horizontal-line"></hr>
                        <div className="login-signup">
                            <Link to="/login" className="login-signup-link">{t("login")}</Link>
                            <p>|</p>
                            <Link to="/signup" className="login-signup-link">{t("sign-up")}</Link>
                        </div>
                    </form>
                </div>

                <div className={`forgot-container ${stage !== 2 ? "hidden" : ""}`}>
                    <h2 className="forgot-title">{t("password-reset")}</h2>
                    <form className="forgot-form">
                        <div className="forgot-input-frame">
                            <label htmlFor="otp">{t("otp-instruction")}</label>
                        	<input onChange={handleOtpChange} type="text" id="otp" placeholder="OTP"></input>
                            <p className={error === true? "forgot-error" : "forgot-error-hidden"}>OTP invalid</p>
                    	</div>
                        <button onClick={handleOtpSubmit} className="forgot-button" type="submit">{t("reset-btn")}</button>
                        <hr className="horizontal-line"></hr>
                        <div className="login-signup">
                            <Link to="/login" className="login-signup-link">{t("login")}</Link>
                            <p>|</p>
                            <Link to="/signup" className="login-signup-link">{t("sign-up")}</Link>
                        </div>
                    </form>

                </div>

                <div className={`forgot-container ${stage !== 3 ? "hidden" : ""}`}>
                    <h2 className="forgot-title">{t("password-reset")}</h2>
                    <div className="forgot-input-frame">
                        <label className="new-password" htmlFor="new-password">Enter new password</label>
                        <input onChange={handlePasswordChange} type="password" id="new-password" placeholder="New password"></input>
                        
                    </div>
                    <div className="forgot-input-frame">
                        <label className="new-password" htmlFor="confirm-new-password">Confirm password</label>
                        <input onChange={handleRePasswordChange} type="password" id="confirm-new-password" placeholder="Confirm password"></input>
                        <p className={error === true? "forgot-error" : "forgot-error-hidden"}>Password not match</p>
                    </div>
                    <button onClick={handleNewPasswordSubmit} className="forgot-button" type="submit">{t("reset-btn")}</button>
                    <hr className="horizontal-line"></hr>
                    <div className="login-signup">
                        <Link to="/login" className="login-signup-link">{t("login")}</Link>
                        <p>|</p>
                        <Link to="/signup" className="login-signup-link">{t("sign-up")}</Link>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Forgot;