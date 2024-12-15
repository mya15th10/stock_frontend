import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// // Import các component
import Login from "./component/Login.js";
import Register from "./component/Signup.js";
import Forgot from "./component/Forgot.js";
import About from "./component/About.js";
import Instruction from "./component/Instruction.js"
import Contact from "./component/Contact.js"
import Dashboard from "./component/Dashboard.js"
import { MyProvider }  from "./component/Context.js"
import Navbar from "./component/Navbar.js";
import Market from './component/Market';
import PredictionPage from './component/Prediction';
import Portfolio from "./component/Portfolio.js";
import ProtectedPage from "./component/ProtectedPage.js";
import PersonalInfo from "./component/PersonalInfo.js";
import TransactionHistory from "./component/TransactionHistory.js";
import Budget from "./component/Budget.js";



function App() {

  return (
    <div>
      <MyProvider >
        <Navbar />
        <Routes>
          <Route path="/" element={<Market />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/instruction" element={<Instruction />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard" element={<ProtectedPage> <Dashboard /> </ProtectedPage>} />
          <Route path="/market" element={<Market />} />
          <Route path="/prediction" element={<PredictionPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/personal-info" element={<ProtectedPage><PersonalInfo /></ProtectedPage>} />
          <Route path="/transaction-history" element={<ProtectedPage><TransactionHistory /></ProtectedPage>} />
          <Route path="/budget" element={<ProtectedPage><Budget /></ProtectedPage>} />

        </Routes>
      </MyProvider >
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