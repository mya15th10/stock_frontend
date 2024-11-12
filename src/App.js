import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// // Import các component
import Login from "./component/Login.js";
import Register from "./component/Signup.js";
import Forgot from "./component/Forgot.js";
import About from "./component/About.js";
import Instruction from "./component/Instruction.js"
import Contact from "./component/Contact.js"


function App() {
  // const navigate = useNavigate();  

  // useEffect(() => {
  //   // Điều hướng đến /About khi ứng dụng được render lần đầu tiên
  //   navigate('/about');
  // }, [navigate]);

  return (
    <div>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/instruction" element={<Instruction />} />
        <Route path="/contact" element={<Contact />} />
        {/* Các Route khác có thể thêm vào đây */}
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;