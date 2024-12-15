import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from './Context';
import "../style/transactionhistory.css";

// Import icons cho sidebar
import dashboard from "../assets/dashboard/sidebar/dashboard.svg";
import portfolio from "../assets/dashboard/sidebar/portfolio.svg";
import prediction from "../assets/dashboard/sidebar/prediction.svg";
import history from "../assets/dashboard/sidebar/history.svg";
import update from "../assets/dashboard/sidebar/update.svg";

import dashboardActive from "../assets/dashboard/sidebar/dashboard-active.svg";
import portfolioActive from "../assets/dashboard/sidebar/portfolio-active.svg";
import predictionActive from "../assets/dashboard/sidebar/prediction-active.svg";
import historyActive from "../assets/dashboard/sidebar/history-active.svg";
import updateActive from "../assets/dashboard/sidebar/update-active.svg";

import logout from "../assets/dashboard/sidebar/logout.svg";

// Mock data cho lịch sử giao dịch
const transactionData = [
    { id: "#15267", date: "Mar 1, 2023", amount: 100, questions: 1, status: "Success" },
    { id: "#15587", date: "Jan 26, 2023", amount: 300, questions: 3, status: "Success" },
    { id: "#12436", date: "Feb 12, 2033", amount: 100, questions: 1, status: "Success" },
    { id: "#15879", date: "Feb 12, 2033", amount: 500, questions: 5, status: "Success" },
    { id: "#15378", date: "Feb 28, 2033", amount: 500, questions: 5, status: "Rejected" },
    { id: "#16609", date: "March 13, 2033", amount: 100, questions: 1, status: "Success" },
    { id: "#16907", date: "March 18, 2033", amount: 100, questions: 1, status: "Pending" },
];

function SideBar(props) {
    function Card(props) {
        return (
            <div className={`sidebar-card ${props.active ? "active-card" : ""}`}>
                <img alt="" src={props.icon}></img>
                <p className="hide-text-sidebar">{props.text}</p>
            </div>
        );
    }

    const [itemOrder, setItemOrder] = useState(4);  // Set mặc định là 4 cho Transaction

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
            <div onClick={props.setLogout} className="logout">
                <img alt="" src={logout}></img>
                <p className="hide-text-sidebar">Log Out</p>
            </div>
        </div>
    );
}

const TransactionHistory = () => {
    const { isLogin, SetIsLogin, setOrder } = useContext(MyContext);
    const navigate = useNavigate();
    
    const [filter, setFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
        setOrder(4); // Set active menu item
    }, [isLogin, navigate, setOrder]);

    // Lọc dữ liệu dựa trên filter
    const filteredData = transactionData.filter(transaction => {
        if (filter === 'All') return true;
        if (filter === 'Today') {
            const today = new Date().toDateString();
            return new Date(transaction.date).toDateString() === today;
        }
        return transaction.status === filter;
    });

    // Tính toán số trang
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div id="dashboard-page">
            <SideBar order={4} setLogout={() => SetIsLogin(false)} />
            
            <div className="dashboard-content">
                <div className="transaction-container">
                    <h1>Transaction History</h1>
                    
                    <div className="filters">
                        <button 
                            className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
                            onClick={() => setFilter('All')}
                        >
                            All
                        </button>
                        <button 
                            className={`filter-btn ${filter === 'Today' ? 'active' : ''}`}
                            onClick={() => setFilter('Today')}
                        >
                            Today
                        </button>
                        <button 
                            className={`filter-btn ${filter === 'Pending' ? 'active' : ''}`}
                            onClick={() => setFilter('Pending')}
                        >
                            Pending
                        </button>
                        <button 
                            className={`filter-btn ${filter === 'Rejected' ? 'active' : ''}`}
                            onClick={() => setFilter('Rejected')}
                        >
                            Rejected
                        </button>
                    </div>

                    <div className="transaction-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Total Questions</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedData.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td>{transaction.id}</td>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.questions}</td>
                                        <td className={`status ${transaction.status.toLowerCase()}`}>
                                            {transaction.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination">
                        <div className="items-per-page">
                            <select 
                                value={itemsPerPage} 
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                            <span>per page</span>
                        </div>

                        <div className="page-navigation">
                            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                                &lt;
                            </button>
                            <span>{currentPage} of {totalPages} pages</span>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistory;