import  "../style/login.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react'
import { MyContext } from "./Context.js"
import { useTranslation } from "react-i18next";

function Login() {
    
    // Set order of component in Navbar
    const { setOrder, SetIsLogin, isLogin, useBackend } = useContext(MyContext);
    useEffect(() => {
        setOrder(5);
    }, [])
    

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)
    const [auth, setAuth] = useState(true);

    const { t } = useTranslation("login");

    const navigate = useNavigate();

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleRemember = (event) => {
        setRemember(event.target.checked);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Email: ", userName);
        console.log("Password: ", password);
        console.log("Remember: ", remember);

        const loginData = {
            username: userName,
            password: password
        }

        console.log(JSON.stringify(loginData));

        const url = "http://localhost:8080/auth/login";
        fetch(url, {
            method: "POST",
            headers: {'Content-Type' : "application/json"},
            credentials: 'include',
            body: JSON.stringify(loginData)
        })
        .then(res => {
            if(!res.ok)
                throw new Error("Request fail " + res.status)
            
            const jwt = res.headers.get("Authorization"); 
            localStorage.setItem("accessToken", jwt)
            console.log(jwt);

            SetIsLogin(true);
            navigate("/dashboard");
        })
        .catch(error => { console.log(error); setAuth(false); if(useBackend === false) {SetIsLogin(true); navigate("/dashboard");} })

    }

    // useEffect(() => {
    //     if(isLogin)
    //         navigate("/dashboard");
    // }, [isLogin])



    return (
        <div className="login-page">
            {/* <Navbar /> */}

            <div className="login-section">
                <div className="login-container">
                    <h2 className="login-title">{t("title")}</h2>
                    <div className={`auth-fail ${auth === true? "auth-fail-hidden" : ""}`}>
                        <p>Authentication failed</p>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-frame">
                            <input type="text" 
                                   placeholder={t("username-placeholder")}
                                   value={userName}
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