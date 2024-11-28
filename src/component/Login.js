import  "../style/login.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react'
import { MyContext } from "./Context.js"
import { useTranslation } from "react-i18next";

function Login() {
    // Set order of component in Navbar
    const { setOrder } = useContext(MyContext);
    useEffect(() => {
        setOrder(5);
    }, [])

    const { userName, setUserName } = useContext(MyContext);

    const [_userName, _setUserName] = useState("");
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)

    const { t } = useTranslation("login");

    const {isLogin, SetIsLogin} = useContext(MyContext);

    const navigate = useNavigate();

    const handleUserNameChange = (event) => {
        _setUserName(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleRemember = (event) => {
        setRemember(event.target.checked);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Email: ", _userName);
        console.log("Password: ", password);
        console.log("Remember: ", remember);

        // const loginData = {
        //     email: userName,
        //     password: password
        // }

        // console.log(JSON.stringify(loginData));

        // const url = 'http://localhost:8080/test';
        // fetch(url, {
        //     method: "POST",
        //     headers: {'Content-Type' : "application/json"},
        //     body: JSON.stringify(loginData)
        // }).then(res => console.log(res))
        //     .then(data => { console.log("Success: ", data) })
        //     .catch(error => { console.log("Error: ", error) })

        SetIsLogin(true);
        setUserName(_userName);

    }

    useEffect(() => {
        if(isLogin)
            navigate("/dashboard");
    }, [isLogin])

    

    return (
        <div className="login-page">
            {/* <Navbar /> */}

            <div className="login-section">
                <div className="login-container">
                    <h2 className="login-title">{t("title")}</h2>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-frame">
                            <input type="text" 
                                   placeholder={t("username-placeholder")}
                                   value={_userName}
                                   onChange={handleUserNameChange}
                            />
                        </div>

                        <div className="input-frame">
                            <input type="password" 
                                   placeholder={t("password-placeholder")}
                                   value={password}
                                   onChange={handlePasswordChange}
                            />
                        </div>

                        <div className="remember-me">
                            <input type="checkbox" 
                                   id="tickbox"
                                   value={remember}
                                   onChange={handleRemember}
                            />
                            <label htmlFor="tickbox">{t("remember-me")}</label>
                        </div>
                        <div className="login-button">
                            <button type="submit">{t("login-btn")}</button>
                        </div>
                        <div className="reg-back">
                            <Link to="/forgot" className="login-link">{t("forgot-password")}</Link>
                            <Link to="/signup" className="login-link">{t("create-account")}</Link>
                        </div>
                        
                    </form>

                </div>
            </div>
            
        </div>
    );
}

export default Login;