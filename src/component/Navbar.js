import "../style/navbar.css"

import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import menuButton from "../assets/menu-button.svg"

import { useTranslation } from "react-i18next";
import { MyContext } from "./Context";
import { useContext, useState } from "react";
import { Link } from 'react-router-dom';

function Navbar() {
    const [isVIE, setVIE] = useState(true);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    

    const { t, i18n } = useTranslation("navbar")

    const { isLogin } = useContext(MyContext);
    const { order, setOrder } = useContext(MyContext);
    const { userName } = useContext(MyContext);

    function setLanguage(isVIE, language) {
        setVIE(isVIE);
        i18n.changeLanguage(language);
    }

    return (
        <div className="navigation-bar">
            <div className="section1">
                <div className="logo">
                    <img alt="logo" src={logo} />
                </div>
                <div className="search-bar">
                    <input type="text" placeholder={t("search-placeholder")}></input>
                </div>
                <div className="language-button">
                    <div className={`btn ${isVIE ? "left" : "right"}`}></div>
                    <button onClick={() => setLanguage(true, 'vi')} type="button" className="toggle-button">VI</button>
                    <button onClick={() => setLanguage(false, 'en')} type="button" className="toggle-button">EN</button>
                </div>

            </div>

            <nav className="section2">
                <Link onClick={() => setOrder(1)} to="/" className={`navbar-link ${order === 1 ? "chossing" : ""}`}>{t("market")}</Link>
                <Link onClick={() => setOrder(2)} to="/instruction" className={`navbar-link ${order === 2 ? "chossing" : ""}`}>{t("instruction")}</Link>
                <Link onClick={() => setOrder(3)} to="/about" className={`navbar-link ${order === 3 ? "chossing" : ""}`}>{t("about")}</Link>
                <Link onClick={() => setOrder(4)} to="/contact" className={`navbar-link ${order === 4 ? "chossing" : ""}`}>{t("contact")}</Link>
                <Link onClick={() => setOrder(5)} to={isLogin ? "/dashboard" : "/login"} className={`navbar-link ${order === 5 ? "chossing" : ""}`}>{isLogin ? (userName == "" ? "alolymus" : userName) : t("login")}</Link>
            </nav>

            <div className="section3">
                <img className="avatar" alt="avatar" src={avatar}></img>
            </div>

            <img className="sidebar-btn" src={menuButton} alt="" onClick={() => setSidebarVisible(!isSidebarVisible)} />

            <div className={`side-bar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
                {/* <img src={closeButton} alt="" onClick={() => setSidebarVisible(!isSidebarVisible)} /> */}
                <a href="#">{t("market")}</a>
                <a href="#">{t("instruction")}</a>
                <a href="#">{t("about")}</a>
                <a href="#">{t("contact")}</a>
                <a href="#">{t("login")}</a>
            </div>

            <hr></hr>
        </div>
    );
}

export default Navbar;