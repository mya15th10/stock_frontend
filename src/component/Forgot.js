import "../styles/forgot.css"
import Navbar from "./Navbar.js"
import { Link } from 'react-router-dom';

function Forgot() {
    return (
        <div className="forgot-page">
            <Navbar />

            <div className="forgot-section">
                <div className="forgot-container">
                    <h2 className="forgot-title">PASSWORD RESET</h2>

                    <form className="forgot-form">
                        <div className="forgot-input-frame">
                            <label htmlFor="email-forgot">Please enter the email address you'd like your password reset information sent to</label>
                        	<input type="email" id="email-forgot" placeholder="Email"></input>
                    	</div>
                        <button className="signup-button" type="submit">Reset password</button>
                        <hr className="horizontal-line"></hr>
                        <div className="login-signup">
                            <Link to="/login" className="login-signup-link">Login</Link>
                            <p>|</p>
                            <Link to="/signup" className="login-signup-link">Signup</Link>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default Forgot;