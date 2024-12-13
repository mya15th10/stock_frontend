import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from './Context';


// Import icons for sidebar
import dashboard from "../assets/dashboard/sidebar/dashboard.svg"
import portfolio from "../assets/dashboard/sidebar/portfolio.svg"
import prediction from "../assets/dashboard/sidebar/prediction.svg"
import history from "../assets/dashboard/sidebar/history.svg"
import update from "../assets/dashboard/sidebar/update.svg"

import dashboardActive from "../assets/dashboard/sidebar/dashboard-active.svg"
import portfolioActive from "../assets/dashboard/sidebar/portfolio-active.svg"
import predictionActive from "../assets/dashboard/sidebar/prediction-active.svg"
import historyActive from "../assets/dashboard/sidebar/history-active.svg"
import updateActive from "../assets/dashboard/sidebar/update-active.svg"
import leftNav from "../assets/dashboard/view-portfolio/left-nav.svg"
import rightNav from "../assets/dashboard/view-portfolio/right-nav.svg"

import logout from "../assets/dashboard/sidebar/logout.svg"

import "../style/dashboard.css"

/**
 * 
 * @param {order} props
 * @param {number} props.order - Used for updating active card in SideBar 
 * @returns 
 */
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
    const [itemOrder, setItemOrder] = useState(2);



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
            <Link onClick={() => setItemOrder(4)} to="#" >
                <Card icon={itemOrder === 4 ? historyActive : history} text="Transaction history" active={itemOrder === 4} />
            </Link>
            <Link onClick={() => setItemOrder(5)} to="#" >
                <Card icon={itemOrder === 5 ? updateActive : update} text="Update personal information" active={itemOrder === 5} />
            </Link>

            <div onClick={() => { props.setLogout() }} className="logout">
                <img alt="" src={logout}></img>
                <p className="hide-text-sidebar">Log Out</p>
            </div>

        </div>
    )
}

const columnPortfolioData = [
    "Symbol", "Date", "Amount", "Purchase price", "Current price", "Sell",
]

var portfolioData = [
    { "symbol": "AAPL", "date": "2024-11-26", "amount": 50, "purchase": 100, "current": 101 },
    { "symbol": "MSFT", "date": "2024-11-25", "amount": 30, "purchase": 200, "current": 190 },
    { "symbol": "GOOGL", "date": "2024-11-24", "amount": 40, "purchase": 1500, "current": 1520 },
    { "symbol": "AMZN", "date": "2024-11-23", "amount": 20, "purchase": 3500, "current": 3550 },
    { "symbol": "TSLA", "date": "2024-11-22", "amount": 10, "purchase": 750, "current": 780 },
    { "symbol": "NVDA", "date": "2024-11-21", "amount": 60, "purchase": 600, "current": 620 },
    { "symbol": "META", "date": "2024-11-20", "amount": 25, "purchase": 330, "current": 200 },
    { "symbol": "NFLX", "date": "2024-11-19", "amount": 35, "purchase": 500, "current": 510 },
    { "symbol": "SPY", "date": "2024-11-18", "amount": 15, "purchase": 430, "current": 440 },
    { "symbol": "DIS", "date": "2024-11-17", "amount": 45, "purchase": 180, "current": 120 }
]

function Portfolio() {
    const { isLogin, SetIsLogin, setOrder } = useContext(MyContext);
    const navigate = useNavigate();

    const [isSelling, setSelling] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [quantityMax, setQuantityMax] = useState(0);
    const [symbol, setSymbol] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0);
    

    // Set order in Navbar
    useEffect(() => {
        setOrder(5);
    }, [setOrder]);

    // Check login status
    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
    }, [isLogin, navigate]);

    const [pageNum, setPageNum] = useState(1);
    const navigateTableFw = () => {
        setPageNum(pageNum + 1);
    };
    const navigateTableBw = () => {
        if(pageNum > 1)
            setPageNum(pageNum - 1);
    }

    const sell = (_symbol, _quantityMax, _currentPrice) => {
        setSelling(true);
        setSymbol(_symbol);
        setQuantityMax(_quantityMax);
        setCurrentPrice(_currentPrice);
    }

    const close = () => {
        setSelling(false);
        setQuantity(0);
    }

    const performSell = () => {

        portfolioData.map(value => {
            if(value.symbol === symbol) {
                value.amount -= quantity;
            }
        })

        close();
    }

    const handleQuantityChange = (e) => {
        let x = e.target.value;
        if(x < 0) {
            setQuantity(0);
        }
        else if(x > quantityMax) {
            setQuantity(quantityMax);
        }
        else {
            setQuantity(x);
        }
    }

    const handleIncQuantity = () => {
        if(quantity < quantityMax) {
            setQuantity(quantity + 1);
        }
            
    }

    const handleDecQuantity = () => {
        if(quantity > 0) {
            setQuantity(quantity - 1);
        }
            
    }

    return (
        <div id="dashboard-page">
            <SideBar setLogout={() => SetIsLogin(false)}></SideBar>

            <div className="dashboard-content">
                <div className="view-portfolio-container">
                    <div className="view-portfolio">
                        <div className="title-navigation">
                            <h2>Portfolio</h2>
                            <div className="navigation">
                                <img onClick={() => navigateTableBw()} alt="" src={leftNav}></img>
                                <p>{pageNum}</p>
                                <img onClick={() => navigateTableFw()} alt="" src={rightNav}></img>
                            </div>
                        </div>
                        <table>
                            <thead className="head">
                                <tr>
                                    {columnPortfolioData.map((header => (
                                        <th>{header}</th>
                                    )))}
                                </tr>
                            </thead>
                            <tbody>
                                {portfolioData.map(row  => ( row.amount > 0 &&
                                    <tr>
                                        <td className="symbol-color">{row.symbol}</td>
                                        <td className="col-color">{row.date}</td>
                                        <td className="col-color">{row.amount}</td>
                                        <td className="col-color">{row.purchase}</td>
                                        <td className={row.current - row.purchase >= 0 ? "increase" : "decrease"}>{row.current}</td>
                                        <td onClick={() => sell(row.symbol, row.amount, row.current)} className="sell-container"><p>sell</p></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div style={{display: isSelling ? "" : "none"}} className="selling-container">
                <div className="selling">
                    <div onClick={close} className="close-btn"><p>x</p></div>
                    <p>Symbol:</p>
                    <h3>{symbol}</h3>
                    <p>Quantity:</p>
                    <div className="inc-dec-quantity">
                        <div onClick={handleDecQuantity} className="inc-dec">-</div>
                        <input onChange={handleQuantityChange} value={quantity}></input>
                        <div onClick={handleIncQuantity} className="inc-dec">+</div>
                    </div>
                    <p>Total:</p>
                    <h3>{currentPrice * quantity}</h3>
                    <div onClick={performSell} className="perform">
                        <p>Sell</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Portfolio;