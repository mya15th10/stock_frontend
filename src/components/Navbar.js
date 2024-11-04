import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import Login from './Login'; // Import component Login

const Navbar = () => {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Language');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguageMenuOpen(false);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  return (
    <header className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button className="search-btn">🔍</button>
      </div>
      <div className="language-switch">
        <button className="language-btn" onClick={toggleLanguageMenu}>
          {selectedLanguage} 🌐
        </button>
        {isLanguageMenuOpen && (
          <div className="language-dropdown">
            <div className="language-option" onClick={() => handleLanguageSelect('English')}>
              English
            </div>
            <div className="language-option" onClick={() => handleLanguageSelect('Spanish')}>
              Spanish
            </div>
            <div className="language-option" onClick={() => handleLanguageSelect('French')}>
              French
            </div>
            <div className="language-option" onClick={() => handleLanguageSelect('German')}>
              German
            </div>
          </div>
        )}
      </div>
      <nav className="menu">
        <a href="#">Market Overview</a>
        <a href="#" onClick={toggleLoginModal}>Login/Register</a>
        <a href="#">Instructions</a>
        <a href="#">Contact</a>
        <a href="#">About</a>
      </nav>

      {/* Sử dụng component Login và truyền props */}
      <Login isOpen={isLoginModalOpen} onClose={toggleLoginModal} />
    </header>
  );
};

export default Navbar;