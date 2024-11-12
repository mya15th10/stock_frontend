import "../styles/signup.css"
import Navbar from "./Navbar"
import { Link } from 'react-router-dom';

function Signup() {
	return (
		<div className="signup-page">
			<Navbar />

			<div className="signup-section">
				<div className="signup-container">
					<h2 className="signup-title">SIGN UP</h2>

					<form className="signup-form">
						<div className="signup-input-frame">
                        	<input type="email" placeholder="Email"></input>
                    	</div>
						<div className="signup-input-frame">
                        	<input type="text" placeholder="Username"></input>
                    	</div>
						<div className="signup-input-frame">
                        	<input type="password" placeholder="Password"></input>
                    	</div>
						<div className="signup-input-frame">
                        	<input type="password" placeholder="Re-enter password"></input>
                    	</div>

						<button className="signup-button" type="submit">Sign up</button>

						<Link className="back-login" to="/login">Back to login</Link>
					</form>
				</div>

			</div>
		</div>
	);
}

export default Signup;