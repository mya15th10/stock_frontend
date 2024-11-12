import "../styles/instruction.css"
import Navbar from "./Navbar.js"

function Instruction() {
    return (
        <div className="instruction-page">
            <Navbar />
            <div className="instruction-section">
                <div className="instruction-title">
                    <h2>INSTRUCTION</h2>
                    <p>Welcome to our stock analysis and prediction platform! 
                       This page will guide you through the key features and 
                       help you make the most out of your experience.</p>
                </div>
                <div className="instruction-content">
                    <div className="left-content">
                        <div className="ordered-box-section">
                            <div className="order-box">
                                <div className="order-number">
                                    <p className=""><a href="#market-overview">1</a></p>
                                </div>
                                <div className="order-content">
                                    <p><a href="#market-overview">How to View <br /> 
                                       Market Overview</a></p>
                                </div>
                            </div>
                            <div className="order-box">
                                <div className="order-number">
                                    <p className=""><a href="#login">2</a></p>
                                </div>
                                <div className="order-content">
                                    <p><a href="#login">Guide to Login, <br />
                                       Signup and <br />
                                       Account Manegement</a></p>
                                </div>
                            </div>
                            <div className="order-box">
                                <div className="order-number">
                                    <p className=""><a href="#analysis">3</a></p>
                                </div>
                                <div className="order-content">
                                    <p><a href="#analysis">Using analysis and <br />
                                       prediction tools</a></p>
                                </div>
                            </div>
                            <div className="order-box">
                                <div className="order-number">
                                    <p className=""><a href="#view">4</a></p>
                                </div>
                                <div className="order-content">
                                    <p><a href="#view">View and manage <br />
                                       personal information <br />
                                       & transaction history</a></p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="right-content">
                        
                            <h4 id="market-overview">1. How to view market overview</h4>
                            <ul>
                                <li>To view the latest market trends and get an overall perspective:</li>
                                <ul>
                                    <li>Access the Market Overview page directly from the main menu. <br />
                                        This section provides key stock market indexes, sector trends, 
                                        and other vital market data.</li>
                                    <li>Use filters to sort information based on different timeframes, 
                                        industries, or regions.</li>
                                    <li>Gain quick insights into market performance, allowing you to 
                                        stay updated on market movements.</li>
                                </ul>
                            </ul>
                            <h4 id="login">2. Guide to Login/Registration and Account Management</h4>
                            <ul>
                                <li>If you wish to access personalized features, follow these steps 
                                    to log in or create an account:  </li>
                                <ul>
                                    <li>Registration: On the homepage, click on "Register." Enter your email, <br />
                                        username, and password, then submit the form.
                                        You’ll receive a confirmation email to verify your account. </li>
                                    <li>Login: For returning users, click on "Login" and enter your credentials to access your dashboard.</li>
                                    <li>Password Recovery: If you forget your password, click on "Forgot Password" in the login section. Follow the instructions to reset it securely. </li>
                                    <li>Account Management: Once logged in, you can update your personal information in the “Profile” section of your dashboard.</li>
                                </ul>
                            </ul>
                            <h4 id="analysis">3. Using Analysis and Prediction Tools</h4>
                            <ul>
                                <li>Our platform offers powerful analysis and prediction tools to assist your investment decisions: </li>
                                <ul>
                                    <li>Access the Tools: Go to the Analysis & Prediction section on the dashboard.</li>
                                </ul>
                            </ul>
                            <h4 id="view">4.View and manage personal information & tranction history</h4>
                            <ul>
                                <li>Something:</li>
                            </ul>
                        
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default Instruction;