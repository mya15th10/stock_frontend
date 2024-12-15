import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from './Context';
import "../style/personalinfo.css";

// Import icons cho sidebar
import dashboard from "../assets/dashboard/sidebar/dashboard.svg"
import portfolio from "../assets/dashboard/sidebar/portfolio.svg"
import prediction from "../assets/dashboard/sidebar/prediction.svg"
import history from "../assets/dashboard/sidebar/history.svg"
import update from "../assets/dashboard/sidebar/update.svg"
import budget from "../assets/dashboard/sidebar/budget.svg"

import dashboardActive from "../assets/dashboard/sidebar/dashboard-active.svg"
import portfolioActive from "../assets/dashboard/sidebar/portfolio-active.svg"
import predictionActive from "../assets/dashboard/sidebar/prediction-active.svg"
import historyActive from "../assets/dashboard/sidebar/history-active.svg"
import updateActive from "../assets/dashboard/sidebar/update-active.svg"
import budgetActive from "../assets/dashboard/sidebar/budget-active.svg"

import logout from "../assets/dashboard/sidebar/logout.svg"

// SideBar Component
function SideBar(props) {
    function Card(props) {
        return (
            <div className={`sidebar-card ${props.active ? "active-card" : ""}`}>
                <img alt="" src={props.icon}></img>
                <p className="hide-text-sidebar">{props.text}</p>
            </div>
        );
    }

    const [itemOrder, setItemOrder] = useState(5); // Set mặc định là 5 cho PersonalInfo

    return (
        <div className="sidebar responsive-sidebar">
            <div></div>
            <Link to="/dashboard" onClick={() => setItemOrder(1)}>
                <Card icon={itemOrder === 1 ? dashboardActive : dashboard} text="Dashboard" active={itemOrder === 1} />
            </Link>
            <Link to="/portfolio" onClick={() => setItemOrder(2)}>
                <Card icon={itemOrder === 2 ? portfolioActive : portfolio} text="View portfolio" active={itemOrder === 2} />
            </Link>
            <Link to="/prediction" onClick={() => setItemOrder(3)}>
                <Card icon={itemOrder === 3 ? predictionActive : prediction} text="Stock prediction" active={itemOrder === 3} />
            </Link>
            <Link to="/transaction-history" onClick={() => setItemOrder(4)}>
                <Card icon={itemOrder === 4 ? historyActive : history} text="Transaction history" active={itemOrder === 4} />
            </Link>
            <Link to="/personal-info" onClick={() => setItemOrder(5)}>
                <Card icon={itemOrder === 5 ? updateActive : update} text="Update personal information" active={itemOrder === 5} />
            </Link>
            <Link onClick={() => setItemOrder(6)} to="/budget">
                <Card icon={itemOrder === 6 ? budgetActive : budget} text="Budget" active={itemOrder === 6} />
            </Link>


            <div onClick={props.setLogout} className="logout">
                <img alt="" src={logout}></img>
                <p className="hide-text-sidebar">Log Out</p>
            </div>
        </div>
    );
}

const PersonalInfo = () => {
    const { isLogin, SetIsLogin, setOrder } = useContext(MyContext);
    const navigate = useNavigate();

    // Check login status and set active menu item
    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
        setOrder(5);
    }, [isLogin, navigate, setOrder]);

    const [userData, setUserData] = useState({
        fullName: '',
        nickName: '',
        gender: '',
        country: '',
        language: '',
        timezone: '',
        email: ''
    });

    const [emails, setEmails] = useState([
        { address: 'information@gmail.com', addedDate: '1 month ago' }
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddEmail = () => {
        setEmails(prev => [...prev, {
            address: '',
            addedDate: 'just now'
        }]);
    };

    const handleSave = async () => {
        try {
            // Thực hiện lưu thông tin
            console.log('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div id="dashboard-page">
            <SideBar setLogout={() => SetIsLogin(false)} />
            
            <div className="dashboard-content">
                <div className="personal-info-container">
                    <h1>Welcome, User</h1>
                    
                    <div className="user-profile-header">
                        <div className="profile-avatar">
                            <img src="/default-avatar.png" alt="User avatar" />
                        </div>
                        <div className="profile-info">
                            <h2>{userData.fullName || 'UserName'}</h2>
                            <p>{emails[0]?.address || 'information@gmail.com'}</p>
                        </div>
                        <button className="save-button" onClick={handleSave}>
                            Save
                        </button>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Your Full Name"
                                value={userData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Nick Name</label>
                            <input
                                type="text"
                                name="nickName"
                                placeholder="Your Nick Name"
                                value={userData.nickName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <select 
                                name="gender"
                                value={userData.gender}
                                onChange={handleInputChange}
                            >
                                <option value="">Your Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Country</label>
                            <select
                                name="country"
                                value={userData.country}
                                onChange={handleInputChange}
                            >
                                <option value="">Your Country</option>
                                <option value="vietnam">Vietnam</option>
                                <option value="us">United States</option>
                                <option value="uk">United Kingdom</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Language</label>
                            <select
                                name="language"
                                value={userData.language}
                                onChange={handleInputChange}
                            >
                                <option value="">Your Language</option>
                                <option value="vi">Tiếng Việt</option>
                                <option value="en">English</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Time Zone</label>
                            <select
                                name="timezone"
                                value={userData.timezone}
                                onChange={handleInputChange}
                            >
                                <option value="">Your Time Zone</option>
                                <option value="UTC+7">UTC+7 (Vietnam)</option>
                                <option value="UTC">UTC (London)</option>
                                <option value="UTC-5">UTC-5 (New York)</option>
                            </select>
                        </div>
                    </div>

                    <div className="email-section">
                        <h3>My email Address</h3>
                        {emails.map((email, index) => (
                            <div key={index} className="email-item">
                                <div className="email-icon">📧</div>
                                <div className="email-details">
                                    <p>{email.address}</p>
                                    <span>{email.addedDate}</span>
                                </div>
                            </div>
                        ))}
                        <button className="add-email-button" onClick={handleAddEmail}>
                            + Add Email Address
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;