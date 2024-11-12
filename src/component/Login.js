import Navbar from "./Navbar.js"
import "../styles/login.css"
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="login-page">
            <Navbar />

            <div className="login-section">
                <div className="login-container">
                    <h2 className="login-title">LOGIN</h2>

                    <form className="login-form">
                        <div className="input-frame">
                            <input type="text" placeholder="Email"></input>
                        </div>

                        <div className="input-frame">
                            <input type="password" placeholder="Password"></input>
                        </div>

                        <div className="remember-me">
                            <input type="checkbox" id="tickbox"></input>
                            <label htmlFor="tickbox">Remember me</label>
                        </div>
                        <div className="login-button">
                            <button type="submit">Login</button>
                        </div>
                        <div className="reg-back">
                            <Link to="/forgot" className="login-link">Forgot password</Link>
                            <Link to="/signup" className="login-link">Create account</Link>
                        </div>
                        
                    </form>

                </div>
            </div>
            
        </div>
    );
}

export default Login;