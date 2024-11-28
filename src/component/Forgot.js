import "../style/forgot.css"

import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { MyContext } from "./Context";
import { useContext, useEffect } from "react";

function Forgot() {
    // Set order of component on Navbar
    const { setOrder } = useContext(MyContext);
    useEffect(() => {
        setOrder(5);
    }, [])

    const { t } = useTranslation("forgot")

    return (
        <div className="forgot-page">
            {/* <Navbar /> */}

            <div className="forgot-section">
                <div className="forgot-container">
                    <h2 className="forgot-title">{t("password-reset")}</h2>

                    <form className="forgot-form">
                        <div className="forgot-input-frame">
                            <label htmlFor="email-forgot">{t("instruction-label")}</label>
                        	<input type="email" id="email-forgot" placeholder="Email"></input>
                    	</div>
                        <button className="signup-button" type="submit">{t("reset-btn")}</button>
                        <hr className="horizontal-line"></hr>
                        <div className="login-signup">
                            <Link to="/login" className="login-signup-link">{t("login")}</Link>
                            <p>|</p>
                            <Link to="/signup" className="login-signup-link">{t("sign-up")}</Link>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default Forgot;