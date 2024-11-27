import "../style/dashboard.css"

import { useState, useRef, useMemo } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { MyContext } from "./Context";


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

import logout from "../assets/dashboard/sidebar/logout.svg"
import option from "../assets/dashboard/sidebar/option.svg"

import balance from "../assets/dashboard/dashboard-content/balance.svg"
import income from "../assets/dashboard/dashboard-content/income.png"
import expenses from "../assets/dashboard/dashboard-content/expenses.png"
import saving from "../assets/dashboard/dashboard-content/saving.png"

import leftNav from "../assets/dashboard/view-portfolio/left-nav.svg"
import rightNav from "../assets/dashboard/view-portfolio/right-nav.svg"


import {
    ResponsiveContainer, PieChart, Pie, Sector,
    Cell, Legend, Tooltip, AreaChart, XAxis, YAxis,
    Area, Bar, BarChart, Rectangle
} from "recharts";


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
    const [itemOrder, setItemOrder] = useState(1);

    

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
            <a onClick={(e) => { setItemOrder(1); goToRef(e, props.dashboardRef, 0) }} >
                <Card icon={itemOrder === 1 ? dashboardActive : dashboard} text="Dashboard" active={itemOrder === 1} />
            </a>
            <a onClick={(e) => {setItemOrder(2); goToRef(e, props.portfolioRef, 0)}}  >
                <Card icon={itemOrder === 2 ? portfolioActive : portfolio} text="View portfolio" active={itemOrder === 2} />
            </a>
            <Link onClick={() => setItemOrder(3)} to="#" >
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


const data = [
    { "name": "Transaction fees", "value": 400 },
    { "name": "Account fees", "value": 300 },
    { "name": "Advisory fees", "value": 300 },
    { "name": "Taxes", "value": 200 }
];

const earning = [
    { datetime: "2024-11-01", amount: 1500 },
    { datetime: "2024-11-02", amount: 300 },
    { datetime: "2024-11-03", amount: -500 },
    { datetime: "2024-11-04", amount: 2500 },
    { datetime: "2024-11-05", amount: -1200 },
    { datetime: "2024-11-06", amount: 400 },
    { datetime: "2024-11-07", amount: -700 },
];

const data1 = [
    { day: 'Monday', trans: 10 },
    { day: 'Tuesday', trans: 25 },
    { day: 'Wednesday', trans: 22 },
    { day: 'Thursday', trans: 35 },
    { day: 'Friday', trans: 19 },
    { day: 'Monday', trans: 19 }
]


const COLORS = ['#6c8bc1', '#8077b7', '#c04f8e', '#ff6166'];

const columnPortfolioData = [
    "Date", "Symbol", "Amount", "Purchase price", "Current price",
]

const portfolioData = [
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


const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, value, payload, percent } = props;

    return (
        <g>
            <text x={cx} y={cy} dy={-30} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <text x={cx} y={cy} dy={10} textAnchor="middle" fill={fill}>
                {value}
            </text>
            <text fontSize={12} x={cx} y={cy} dy={40} textAnchor="middle" fill={fill}>
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 7}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
        </g>
    );
};

const renderCustomLegend = (props) => {
    const { payload } = props; // payload chứa dữ liệu từ chart
    return (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {payload.map((entry, index) => (
                <li key={`item-${index}`} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexWrap: "wrap" }}>
                    {/* Icon hình tròn */}
                    <div
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',   // Tạo hình tròn
                            backgroundColor: COLORS[index % COLORS.length],
                            marginRight: '10px',    // Khoảng cách giữa icon và label
                            marginBottom: '0'
                        }}
                    />
                    {/* Label */}
                    <p style={{
                        fontWeight: 'bold',
                        margin: '0',
                        color: COLORS[index % COLORS.length],
                    }}>
                        {entry.payload.name}
                    </p>
                </li>
            ))}
        </ul>
    );
};

function goToRef(event, targetRef, offset) {
    event.preventDefault();
    if(targetRef.current) {
        const targetPosition = targetRef.current.offsetTop - offset;
        window.scrollTo({top: targetPosition, behavior: "smooth"})
    }
};



function Dashboard() {
    // Set order of component on Navbar
    const { setOrder } = useContext(MyContext);
    useEffect(() => {
        setOrder(5);
    }, [])

    // get isLogin and SetIsLogin from context
    const { isLogin, SetIsLogin } = useContext(MyContext); 

    // react hook for navigating
    const navigate = useNavigate();

    // If isLogin is false, navigate to "/login"
    useEffect(() => {
        if (!isLogin)
            navigate("/login");
    }, [isLogin])

    // optIncome: 0-week, 1-month, 2-year. Used for dropdown in Income card
    const [optIncome, setOptIncome] = useState(0);
    const [isDropdownIncome, setDropdownIncome] = useState(false)

    // optExpense: 0-week, 1-month, 2-year. Used for dropdown in Expense card
    const [optExpense, setOptExpense] = useState(0);
    const [isDropdownExpense, setDropdownExpense] = useState(false)

    
   /**
    * 
    * @param {string} props.name - the name of the card
    * @param {JSX.Element} props.icon - the icon of the card
    * @param {string|number} props.money - represent the money in card
    * @param {JSX.Element} props.option - the card has option icon which can be clicked to set `time'
    * @param {string} props.time - have to go with option
    * @param {boolean} props.isDropdown - the state of a dropdown menu
    * @param {function} props.setDropdown - the function set state for `isDropdown'
    * @param {function} props.setOpt - the function set option item for dropdown menu
    * @returns 
    */
    function RedCard(props) {
        return (
            <div className="red-card">
                <div className="circle">
                    <img alt="" src={props.icon} />
                </div>
                {props.option && (
                    <img onClick={() => props.setDropdown(!props.isDropdown)} className="option" alt="" src={props.option}></img>)}
                {props.isDropdown && props.option && (
                    <div className="dropdown-option">
                        <p onClick={() => { props.setOpt(0); props.setDropdown(false) }}>Week</p>
                        <p onClick={() => { props.setOpt(1); props.setDropdown(false) }}>Month</p>
                        <p onClick={() => { props.setOpt(2); props.setDropdown(false) }}>Year</p>
                    </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <h2 className="red-card-name">{props.name}</h2>
                    {props.option && (<p style={{ marginBottom: 0, color: "white", fontSize: "0.9rem" }}>{props.time}</p>)}
                </div>

                <h4 className="money">${props.money}</h4>
            </div>
        );
    }

    /**
     * This function used for Income card and Expense card.
     * @param {string} lang - which language to return  
     * @param {number} index - 0 || 1 || 2
     * @returns 0-week, 1-month, 2-year
     */
    function typeOfTime(lang, index) {
        var arr;
        if (lang === "vi") {
            arr = ["Tuần", "Tháng", "Năm"];
        } else {
            arr = ["Week", "Month", "Year"];
        }

        return arr[index];
    }

    // activeIndex represent for active sector in PieChart.
    // setActiveIndex used for onMouseEnter and onMouseLeave in PieChart
    const [activeIndex, setActiveIndex] = useState(null);
    
    // The state whether show legend or not in PieChart
    const [showLegend, setShowLegend] = useState(true);

    // Do not show legend when (width < 700) or (1300 <= width < 1500)
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 700 && showLegend) {
                setShowLegend(false);
            } else if (window.innerWidth < 1550 && window.innerWidth >= 1300) {
                setShowLegend(false);
            } else if (window.innerWidth >= 700 && showLegend === false) {
                setShowLegend(true);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [showLegend]);

    const portfolioRef = useRef(null);
    const dashboardRef = useRef(null);
    const [sidebarOrder, setSidebarOrder] = useState(1);

    const [portfolioPos, setPortfolioPos] = useState(0);

    // Cập nhật vị trí cuộn khi cuộn trang
    useEffect(() => {
        function handleScroll() {
            var portfolioPosition;
            if(portfolioRef.current)
                portfolioPosition = portfolioRef.current.getBoundingClientRect();

            setPortfolioPos(portfolioPosition.top);  
        };

        window.addEventListener("scroll", handleScroll);

        // Dọn dẹp sự kiện khi component bị hủy
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    
    useEffect(() => {
        if (portfolioPos <= window.innerHeight / 2) {
            setSidebarOrder(2);  
        } else {
            setSidebarOrder(1);  
        }
        
    }, [portfolioPos]); 

    const [pageNum, setPageNum] = useState(1);
    const navigateTableFw = () => {
        setPageNum(pageNum + 1);
    };
    const navigateTableBw = () => {
        setPageNum(pageNum - 1);
    }


    return (
        <div id="dashboard-page">
            <div style={{ height: "200vh" }}></div>  {/* gia lap thanh cuon*/}

            <SideBar order={sidebarOrder} setLogout={() => SetIsLogin(false)}  
                    portfolioRef={portfolioRef} dashboardRef={dashboardRef} 
            />

            <div className="dashboard-content">
                <div ref={dashboardRef} className="red-cards">
                    <RedCard icon={balance} name="Total Balance" money={1.1234} />
                    <RedCard isDropdown={isDropdownIncome} setOpt={setOptIncome} setDropdown={setDropdownIncome}
                        option={option} icon={income} name="Income" time={`(${typeOfTime("en", optIncome)})`} money={1.1234}
                    />
                    <RedCard isDropdown={isDropdownExpense} setOpt={setOptExpense} setDropdown={setDropdownExpense}
                        option={option} icon={expenses} name="Expense" time={`(${typeOfTime("en", optExpense)})`} money={1.1234}
                    />
                    <RedCard icon={saving} name="Saving" money={1.1234} />
                </div>

                <div className="AllExpenses-EarningFlow">
                    <div className="all-expenses">
                        <h3>All Expenses</h3>
                        <ResponsiveContainer height={300} width="100%" >
                            <PieChart>
                                <Pie data={data}
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    dataKey="value" cx={showLegend ? "33%" : "50%"} cy="50%"
                                    outerRadius="80%" innerRadius="60%"
                                    fill="#8884d8"
                                    onMouseEnter={(_, index) => setActiveIndex(index)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                >
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <text
                                    x={showLegend ? "33%" : "50%"} y="50%" textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="piechart-text"
                                    fill="#f2f2f2"
                                >
                                    {activeIndex == null ? "100%" : ""}
                                </text>
                                {showLegend && (<Legend iconType="circle"
                                    align="center" verticalAlign="middle" layout="vertical"
                                    wrapperStyle={{ top: "20%", right: "5%" }}
                                    content={renderCustomLegend}

                                />)}


                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="earning-flow">
                        <h3>Earning Flow</h3>
                        <ResponsiveContainer height="80%">
                            <AreaChart data={earning}
                                margin={{ left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="datetime" />
                                <YAxis />

                                <Tooltip />
                                <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="volume-container">
                    <div className="volume">
                        <ResponsiveContainer width="100%" height="95%">
                            <BarChart

                                data={data1}
                                margin={{
                                    top: 20,
                                    right: 10,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >

                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="trans" fill="#008170" activeBar={<Rectangle />} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                <div ref={portfolioRef}  className="view-portfolio-container">
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
                                {portfolioData.map(row => (
                                    <tr>
                                        <td className="symbol-color">{row.symbol}</td>
                                        <td className="col-color">{row.date}</td>
                                        <td className="col-color">{row.amount}</td>
                                        <td className="col-color">{row.purchase}</td>
                                        <td className={row.current - row.purchase >= 0 ? "increase" : "decrease"}>{row.current}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default Dashboard;