import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from './Context';


// Import icons for sidebar
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

import eye from "../assets/eye.png"
import eyeHidden from "../assets/eye-hidden.png"

import logout from "../assets/dashboard/sidebar/logout.svg"
import "../style/budget.css";


function SideBar(props) {

    /**
     * 
     * @param { active, icon, text } props 
     * @param {boolean} props.active - if true, apply active-card css
     * @param {JSX.Element} props.icon - icon for the card
     * @param {string} props.text - text go with icon
     * @returns {JSX.Element} - A card for side bar
     */
    function Card(props) {
        return (
            <div className={`sidebar-card ${props.active ? "active-card" : ""}`}>
                <img alt="" src={props.icon}></img>
                <p className="hide-text-sidebar">{props.text}</p>
            </div>
        );
    }

    // itemOrder represent the active card
    const [itemOrder, setItemOrder] = useState(6);



    // If props.order is changed, re-render for updating active card in sidebar
    useEffect(() => {
        if (props.order) {
            setItemOrder(props.order);
            console.log("order:", props.order)
        }
    }, [props.order])

    return (
        <div className="sidebar responsive-sidebar">
            <div ></div>
            <Link onClick={() => { setItemOrder(1); }} to="/dashboard" >
                <Card icon={itemOrder === 1 ? dashboardActive : dashboard} text="Dashboard" active={itemOrder === 1} />
            </Link>
            <Link onClick={() => { setItemOrder(2); }} to="/portfolio" >
                <Card icon={itemOrder === 2 ? portfolioActive : portfolio} text="View portfolio" active={itemOrder === 2} />
            </Link>
            <Link onClick={() => setItemOrder(3)} to="/prediction" >
                <Card icon={itemOrder === 3 ? predictionActive : prediction} text="Stock prediction" active={itemOrder === 3} />
            </Link>
            <Link onClick={() => setItemOrder(4)} to="/transaction-history" >
                <Card icon={itemOrder === 4 ? historyActive : history} text="Transaction history" active={itemOrder === 4} />
            </Link>
            <Link onClick={() => setItemOrder(5)} to="/personal-info" >
                <Card icon={itemOrder === 5 ? updateActive : update} text="Update personal information" active={itemOrder === 5} />
            </Link>
            <Link onClick={() => setItemOrder(6)} to="/budget">
                <Card icon={itemOrder === 6 ? budgetActive : budget} text="Budget" active={itemOrder === 6} />
            </Link>

            <div onClick={() => { props.setLogout() }} className="logout">
                <img alt="" src={logout}></img>
                <p className="hide-text-sidebar">Log Out</p>
            </div>

        </div>
    )
}

function Budget() {
    const { isLogin, SetIsLogin, setOrder } = useContext(MyContext);
    const navigate = useNavigate();

    useEffect(() => {
        setOrder(5);
    }, [setOrder]);

    // Check login status
    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
    }, [isLogin, navigate]);

    const [balance, setBalance] = useState(123456789);

    const [showBalance, setShowBalance] = useState(true);

    const [depositAmount, setDepositAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);

    const [activeMethod, setActiveMethod] = useState(1);

    const handleDepositChange = (e) => {
        setDepositAmount(e.target.value);
    }

    const handleWithdrawChange = (e) => {
        setWithdrawAmount(e.target.value);
    }

    const suggest = (value) => {
        var x = value;
        var cnt = 0;

        while(x != 0) {
            x = Math.floor(x / 10);
            cnt++;
        }

        while(cnt < 5) {
            value *= 10;
            cnt++;
        }
        
        if(cnt === 5)
            return [value, value * 10, value * 100, value * 10000];

        if(cnt === 6)
            return [value * 10, value * 100];

        return [value * 10];
    }

    const chooseSuggest = (value) => {
        setDepositAmount(value);
    }

    const depositBtn = () => {
        setBalance(Number(balance) + Number(depositAmount));
    }

    const withdrawBtn = () => {
        if(balance > 0)
            setBalance(Number(balance) - Number(withdrawAmount));
    }

    return(
        <div id="budget">
            <SideBar setLogout={() => SetIsLogin(false)}></SideBar>

            <div className="my-budget-container">
                <div className="my-budget">
                    <h1>My Budget</h1>
                    <div className="balance">
                        <p style={{display: (showBalance? "" : "none")}}>{balance.toLocaleString()}</p>
                        <p style={{display: (showBalance? "none" : "")}}>****************</p>
                        <img onClick={() => setShowBalance(!showBalance)} className="hide-show" alt="" src={showBalance? eye : eyeHidden}></img>
                    </div>
                    <div className="deposit-withdraw-container">

                        <div className="deposit-withdraw">
                            <h2>Deposit</h2>
                            <div className="deposit-withdraw-input-group">
                                <label htmlFor="deposit">Amount to deposit:</label>
                                <input value={depositAmount} onChange={handleDepositChange} id="deposit"></input>
                            </div>
                            <div className="suggest">
                                {suggest(depositAmount).filter(val => val > 0) .map(val => (
                                    <p onClick={() => chooseSuggest(val)}>{val.toLocaleString()}</p>
                                ))}
                            </div>
                            <div className="method">
                                <p onClick={() => setActiveMethod(1)} className={activeMethod === 1 ? "active-method" : ""}>MBBank</p>
                                <p onClick={() => setActiveMethod(2)} className={activeMethod === 2 ? "active-method" : ""}>VietcomBank</p>
                                <p onClick={() => setActiveMethod(3)} className={activeMethod === 3 ? "active-method" : ""}>Momo</p>
                            </div>

                            <div onClick={depositBtn} className="depost-withdraw-btn">
                                <p>Deposit</p>
                            </div>
                        </div>

                        <div className="deposit-withdraw">
                            <h2>Withdraw</h2>
                            <div className="deposit-withdraw-input-group">
                                <label htmlFor="deposit">Amount to withdraw:</label>
                                <input value={withdrawAmount} onChange={handleWithdrawChange} id="deposit"></input>
                            </div>
                            <div className="suggest">
                                {suggest(withdrawAmount).filter(val => val > 0) .map(val => (
                                    <p onClick={() => chooseSuggest(val)}>{val.toLocaleString()}</p>
                                ))}
                            </div>
                            <div className="method">
                                <p onClick={() => setActiveMethod(1)} className={activeMethod === 1 ? "active-method" : ""}>MBBank</p>
                                <p onClick={() => setActiveMethod(2)} className={activeMethod === 2 ? "active-method" : ""}>VietcomBank</p>
                                <p onClick={() => setActiveMethod(3)} className={activeMethod === 3 ? "active-method" : ""}>Momo</p>
                            </div>

                            <div onClick={withdrawBtn} className="depost-withdraw-btn">
                                <p>Withdraw</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Budget;
