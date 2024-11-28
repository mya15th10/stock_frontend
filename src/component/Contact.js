import "../style/contact.css"

import phone from "../assets/phone-call.svg"
import email from "../assets/email.svg"
import location from "../assets/location.svg"
import facebook from "../assets/facebook-icon.svg"
import google from "../assets/google-icon.svg"
import twitter from "../assets/twitter-icon.svg"
import instagram from "../assets/instagram-icon.svg"
import youtube from "../assets/youtube-icon.svg"

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MyContext } from "./Context";
import { useContext, useEffect } from "react"

function Contact() {
    // Set order of component on Navbar
    const { setOrder } = useContext(MyContext);
    useEffect(() => {
        setOrder(4);
    }, [])

    const { t } = useTranslation("contact");
    return (
        <div className="contact-page">
            {/* <Navbar /> */}
            
            <div className="contact-section">
                <div className="contact-title">
                    <h2>{t("contact-title")}</h2>
                    <p>{t("instruction")}</p>
                </div>
                <div className="contact-box">
                    <div className="left-box">
                        <div className="contact-information-title">
                            <h3>{t("information")}</h3>
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
                                <label htmlFor="contact-first-name">{t("first-name")}</label>
                                <input id="contact-first-name" type="text"></input>
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="contact-last-name">{t("last-name")}</label>
                                <input id="contact-last-name" type="text"></input>
                            </div>
                        </div>
                        <div className="right-box-one-line">
                            <div className="input-wrapper">
                                <label htmlFor="contact-first-name">{t("email")}</label>
                                <input id="contact-email" type="text"></input>
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="contact-phone-number">{t("phone-number")}</label>
                                <input id="contact-phone-number" type="text"></input>
                                
                            </div>
                        </div>

                        <div className="contact-message">
                            <label htmlFor='text-input'>{t("message")}</label>
                            <textarea id="text-input" className="text-area" placeholder={t("message-instruction")}></textarea>
                        </div>
                        
                        <div className="contact-send-button">
                            <button type="submit">{t("send-btn")}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;