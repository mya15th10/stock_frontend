import "../style/signup.css"

import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { MyContext } from "./Context";
import { useContext, useEffect } from "react";

function Signup() {
	// Set order of component on Navbar
    const { setOrder } = useContext(MyContext);
	useEffect(() => {
        setOrder(5);
    }, [])

	const { t } = useTranslation("signup");
	
	return (
		<div className="signup-page">
			{/* <Navbar /> */}

			<div className="signup-section">
				<div className="signup-container">
					<h2 className="signup-title">{t("signup-title")}</h2>

					<form className="signup-form">
						<div className="signup-input-frame">
                        	<input type="email" placeholder={t("email-placeholder")}></input>
                    	</div>
						<div className="signup-input-frame">
                        	<input type="text" placeholder={t("username-placeholder")}></input>
                    	</div>
						<div className="signup-input-frame">
                        	<input type="password" placeholder={t("password-placeholder")}></input>
                    	</div>
						<div className="signup-input-frame">
                        	<input type="password" placeholder={t("re-password-placeholder")}></input>
                    	</div>

						<button className="signup-button" type="submit">{t("signup-btn")}</button>

						<Link className="back-login" to="/login">{t("back-login")}</Link>
					</form>
				</div>

			</div>
		</div>
	);
}

export default Signup;