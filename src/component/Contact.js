import { Link } from 'react-router-dom';

import "../styles/contact.css"
import Navbar from "./Navbar"
import phone from "../assets/phone-call.svg"
import email from "../assets/email.svg"
import location from "../assets/location.svg"
import facebook from "../assets/facebook-icon.svg"
import google from "../assets/google-icon.svg"
import twitter from "../assets/twitter-icon.svg"
import instagram from "../assets/instagram-icon.svg"
import youtube from "../assets/youtube-icon.svg"

function Contact() {
    return (
        <div className="contact-page">
            <Navbar />
            <div className="contact-section">
                <div className="contact-title">
                    <h2>CONTACT US</h2>
                    <p>Any question or remarks? Just write us a message</p>
                </div>
                <div className="contact-box">
                    <div className="left-box">
                        <div className="contact-information-title">
                            <h3>Contact information</h3>
                        </div>
                        <div className="contact-infor-wrapper">
                            <div className="contact-infor">
                                <img alt="" src={phone}/>
                                <p>700</p>
                            </div>
                            <div className="contact-infor">
                                <img alt="" src={email}/>
                                <p>7ta@vapco.ricon</p>
                            </div>
                            <div className="contact-infor">
                                <img alt="" src={location}/>
                                <p>Saudi Pro League</p>
                            </div>
                        </div>
                        <div className="contact-icons">
                           <Link to="https://www.facebook.com/Cristiano"><img alt="" src={facebook} /></Link>
                           <Link to="#"><img alt="" src={google} /></Link>
                           <Link to="#"><img alt="" src={twitter} /></Link>
                           <Link to="https://www.instagram.com/cristiano/"><img alt="" src={instagram} /></Link>
                           <Link to="https://www.youtube.com/@cristiano"><img alt="" src={youtube} /></Link>
                        </div>
                        
                    </div>
                    
                    <form className="right-box">
                        <div className="right-box-one-line">
                            <div className="input-wrapper">
                                <input id="contact-first-name" type="text"></input>
                                <label htmlFor="contact-first-name">First name</label>
                            </div>
                            <div className="input-wrapper">
                                <input id="contact-last-name" type="text"></input>
                                <label htmlFor="contact-last-name">Last name</label>
                            </div>
                        </div>
                        <div className="right-box-one-line">
                            <div className="input-wrapper">
                                <input id="contact-email" type="text"></input>
                                <label htmlFor="contact-first-name">Email</label>
                            </div>
                            <div className="input-wrapper">
                                <input id="contact-phone-number" type="text"></input>
                                <label htmlFor="contact-phone-number">Phone number</label>
                            </div>
                        </div>

                        <div className="contact-message">
                            <label htmlFor='text-input'>Message</label>
                            <textarea id="text-input" className="text-area" placeholder="Write your message here"></textarea>
                        </div>
                        
                        <div className="contact-send-button">
                            <button type="submit">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;