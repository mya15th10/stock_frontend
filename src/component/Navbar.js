import { useState } from "react";
import { Link } from 'react-router-dom';
import "../styles/navbar.css"
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import menuButton from "../assets/menu-button.svg"
import closeButton from "../assets/close-button.svg"

function Navbar() {
    const [isLeft, setLeftRight] = useState(true);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    return (
        <div className="navigation-bar">
            <div className="section1">
                <div className="logo">
                    <img alt="logo" src={logo} />
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search"></input>
                </div>
                <div className="language-button">
                    <div className={`btn ${isLeft ? "left" : "right"}`}></div>
                    <button onClick={() => setLeftRight(true)} type="button" className="toggle-button">VI</button>
                    <button onClick={() => setLeftRight(false)} type="button" className="toggle-button">EN</button>
                </div>
            </div>

            <nav className="section2">
                <Link to="#" className="navbar-link">Martket Overview</Link>
                <Link to="/instruction" className="navbar-link">Instruction</Link>
                <Link to="/about" className="navbar-link">About</Link>
                <Link to="/contact" className="navbar-link">Contact</Link>
                <Link to="/login" className="navbar-link">Login</Link>
            </nav>

            <div className="section3">
                <img className="avatar" alt="avatar" src={avatar}></img>
            </div>

            <img src={menuButton} alt="" onClick={() => setSidebarVisible(!isSidebarVisible)} />

            <div className={`side-bar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
                <img src={closeButton} alt="" onClick={() => setSidebarVisible(!isSidebarVisible)} />
                <Link to="/#">Market Overview</Link>
                <Link to="/instruction">Instruction</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/login">Login/Register</Link>
            </div>


        </div>
    );
}

export default Navbar;