import React from 'react';
import '../styles/Login.css'; // Import CSS riêng cho component Login

const Login = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Nếu modal không mở, không render gì cả

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>LOGIN</h2>
        <form>
          <input type="text" placeholder="Username" className="modal-input" />
          <input type="password" placeholder="Password" className="modal-input" />
          <div className="modal-checkbox">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="modal-button">Login</button>
        </form>
        <p><a href="#">Forgot the password?</a></p>
        <p>Don't have an account? <a href="#">Register</a></p>
      </div>
    </div>
  );
};

export default Login;