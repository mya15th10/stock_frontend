import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from './Context';
import "../style/prediction.css";
import {
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, AreaChart, Area
} from 'recharts';

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

    const [itemOrder, setItemOrder] = useState(3);

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

const PredictionPage = () => {
    const { isLogin, SetIsLogin, setOrder } = useContext(MyContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [recommendationSearch, setRecommendationSearch] = useState('');
    const [timeRange, setTimeRange] = useState('7d');
    const [selectedStock, setSelectedStock] = useState(null);

    useEffect(() => {
        setOrder(5);
    }, [setOrder]);

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
    }, [isLogin, navigate]);

    // Sample data for predictions
    const predictData  = {
        'FPT': {
            '7d': [
                { date: '2024-12-14', openPrice: 92.3, closePrice: 93.1 },
                { date: '2024-12-15', openPrice: 92.8, closePrice: 93.5 },
                { date: '2024-12-16', openPrice: 93.2, closePrice: 93.9 },
                { date: '2024-12-17', openPrice: 93.6, closePrice: 94.2 },
                { date: '2024-12-18', openPrice: 94.0, closePrice: 94.6 },
                { date: '2024-12-19', openPrice: 94.3, closePrice: 94.9 },
                { date: '2024-12-20', openPrice: 94.7, closePrice: 95.2 }
            ],
            '30d': [
                // Data for 30 days
                { date: '2024-12-14', openPrice: 92.3, closePrice: 93.1 },
                { date: '2024-12-20', openPrice: 93.5, closePrice: 94.2 },
                // ... more data
            ],
            '1y': [
                // Data for 1 year
                { date: '2024-12', openPrice: 92.3, closePrice: 93.1 },
                { date: '2025-01', openPrice: 94.5, closePrice: 95.2 },
                // ... more data
            ]
        },
        'VNM': {
            '7d': [
                { date: '2024-12-14', openPrice: 86.5, closePrice: 87.2 },
                { date: '2024-12-15', openPrice: 87.0, closePrice: 87.8 },
                { date: '2024-12-16', openPrice: 87.5, closePrice: 88.1 },
                { date: '2024-12-17', openPrice: 88.0, closePrice: 88.7 },
                { date: '2024-12-18', openPrice: 88.4, closePrice: 89.1 },
                { date: '2024-12-19', openPrice: 88.9, closePrice: 89.6 },
                { date: '2024-12-20', openPrice: 89.3, closePrice: 90.0 }
            ],
            '30d': [
                // Data for 30 days
                { date: '2024-12-14', openPrice: 92.3, closePrice: 93.1 },
                { date: '2024-12-20', openPrice: 93.5, closePrice: 94.2 },
                // ... more data
            ],
            '1y': [
                 // Data for 1 year
                 { date: '2024-12', openPrice: 92.3, closePrice: 93.1 },
                 { date: '2025-01', openPrice: 94.5, closePrice: 95.2 },
                 // ... more data
            ]
        }
    };

    // Market trend data
    const marketTrendData = [
        { date: '2024-12-01', volume: 1200000, trend: 85 },
        { date: '2024-12-02', volume: 950000, trend: 86 },
        { date: '2024-12-03', volume: 1500000, trend: 84 },
        { date: '2024-12-04', volume: 1100000, trend: 87 },
        { date: '2024-12-05', volume: 1300000, trend: 86 },
        { date: '2024-12-06', volume: 1400000, trend: 88 },
        { date: '2024-12-07', volume: 1600000, trend: 89 }
    ];

    const topRecommendations = [
        { symbol: 'VNM', action: 'BUY', confidence: 0.9, currentPrice: 86.00, targetPrice: 90.00 },
        { symbol: 'FPT', action: 'HOLD', confidence: 0.85, currentPrice: 92.00, targetPrice: 92.50 },
        { symbol: 'VIC', action: 'SELL', confidence: 0.88, currentPrice: 98.00, targetPrice: 95.00 }
    ];
    //  recommendationData cho từng mốc thời gian
    const recommendationData = {
        'FPT': {
            '7d': { action: 'BUY', currentPrice: 92.00, targetPrice: 94.50, confidence: 0.92 },
            '30d': { action: 'HOLD', currentPrice: 92.00, targetPrice: 92.50, confidence: 0.85 },
            '1y': { action: 'SELL', currentPrice: 92.00, targetPrice: 90.00, confidence: 0.78 }
        },
        'VNM': {
            '7d': { action: 'SELL', currentPrice: 86.00, targetPrice: 84.00, confidence: 0.88 },
            '30d': { action: 'BUY', currentPrice: 86.00, targetPrice: 90.00, confidence: 0.90 },
            '1y': { action: 'HOLD', currentPrice: 86.00, targetPrice: 86.50, confidence: 0.82 }
        }
        // Thêm data cho các mã khác
    };
    const handleSearch = (query) => {
        setSearchQuery(query);
        const stock = Object.keys(predictData).find(
            symbol => symbol.toLowerCase() === query.toLowerCase()
        );
        setSelectedStock(stock);
    };

    const getActionColor = (action) => {
        switch(action) {
            case 'BUY': return 'text-green-500';
            case 'SELL': return 'text-red-500';
            default: return 'text-yellow-500';
        }
    };

    return (
        <div id="dashboard-page">
            <SideBar setLogout={() => SetIsLogin(false)} />

            <div className="dashboard-content">
                <div className="prediction-container">
                    {/* Price Prediction Section */}
                    <div className="prediction-section">
                        <div className="prediction-header">
                            <h2 className="text-2xl font-bold text-gray-200">Price Prediction</h2>
                            <div className="search-time-container">
                                <input
                                    type="text"
                                    placeholder="Tìm mã cổ phiếu..."
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="quick-search"
                                />
                                <div className="time-range-selector">
                                    <button 
                                        className={`time-button ${timeRange === '7d' ? 'active' : ''}`}
                                        onClick={() => setTimeRange('7d')}
                                    >
                                        7 Days
                                    </button>
                                    <button 
                                        className={`time-button ${timeRange === '30d' ? 'active' : ''}`}
                                        onClick={() => setTimeRange('30d')}
                                    >
                                        30 Days
                                    </button>
                                    <button 
                                        className={`time-button ${timeRange === '1y' ? 'active' : ''}`}
                                        onClick={() => setTimeRange('1y')}
                                    >
                                        1 Year
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Price Prediction Chart */}
                        {selectedStock && (
                            <>
                                {/* Trading Recommendations cho mã được chọn */}
                                <div className="recommendation-section mb-6">
                                    <h2 className="text-2xl font-bold text-gray-200 mb-4">
                                        Trading Recommendations for {selectedStock}
                                    </h2>
                                    <div className="recommendation-table-container">
                                        <table className="prediction-table">
                                            <thead>
                                                <tr>
                                                    <th>Time Frame</th>
                                                    <th>Action</th>
                                                    <th>Current Price</th>
                                                    <th>Target Price</th>
                                                    <th>Confidence</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {['7d', '30d', '1y'].map((timeframe) => {
                                                    const recommendation = recommendationData[selectedStock][timeframe];
                                                    return (
                                                        <tr key={timeframe}>
                                                            <td className="date-color">
                                                                {timeframe === '7d' ? '7 Days' :
                                                                timeframe === '30d' ? '30 Days' : '1 Year'}
                                                            </td>
                                                            <td className={getActionColor(recommendation.action)}>
                                                                {recommendation.action}
                                                            </td>
                                                            <td className="col-color">
                                                                ${recommendation.currentPrice}
                                                            </td>
                                                            <td className="col-color">
                                                                ${recommendation.targetPrice}
                                                            </td>
                                                            <td className="col-color">
                                                                {(recommendation.confidence * 100).toFixed(1)}%
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* Price Prediction Chart */}
                                <div className="chart-container">
                                    <h3 className="text-xl font-bold text-gray-200 mb-4">Price Prediction</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart 
                                            data={predictData[selectedStock][timeRange]} 
                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="openPrice" stroke="#8884d8" name="Open Price" strokeWidth={2} />
                                            <Line type="monotone" dataKey="closePrice" stroke="#82ca9d" name="Close Price" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Market Trend Chart */}
                                <div className="chart-container mt-8">
                                    <h3 className="text-xl font-bold text-gray-200 mb-4">Market Trend Analysis</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={marketTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <defs>
                                                    <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" />
                                                <YAxis yAxisId="left" />
                                                <YAxis yAxisId="right" orientation="right" />
                                                <Tooltip />
                                                <Legend />
                                                <Area 
                                                    yAxisId="left"
                                                    type="monotone" 
                                                    dataKey="volume" 
                                                    stroke="#8884d8" 
                                                    fillOpacity={1} 
                                                    fill="url(#colorTrend)" 
                                                    name="Trading Volume"
                                                />
                                                <Line 
                                                    yAxisId="right"
                                                    type="monotone" 
                                                    dataKey="trend" 
                                                    stroke="#82ca9d" 
                                                    name="Price Trend" 
                                                    strokeWidth={2}
                                                />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                {/* Daily Predictions Table */}
                                <div className="prediction-table-container mt-6">
                                    <h3 className="text-xl font-bold text-gray-200 mb-4">Daily Price Predictions</h3>
                                    <table className="prediction-table">
                                        <thead>
                                                <tr>
                                                    <th>Ngày</th>
                                                    <th>Giá mở cửa dự đoán</th>
                                                    <th>Giá đóng cửa dự đoán</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {predictData[selectedStock][timeRange].map((day) => (
                                                    <tr key={day.date}>
                                                        <td className="date-color">{day.date}</td>
                                                        <td className="col-color">${day.openPrice}</td>
                                                        <td className="col-color">${day.closePrice}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>





                                

                    {/* Top 10 Recommendations */}
                    <div className="top-recommendations-section">
                        <h2 className="text-2xl font-bold text-gray-200 mb-4">Top 10 Recommendations</h2>
                        <div className="recommendation-table-container">
                            <table className="prediction-table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Symbol</th>
                                        <th>Action</th>
                                        <th>Current Price</th>
                                        <th>Target Price</th>
                                        <th>Confidence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topRecommendations.map((recommendation, index) => (
                                        <tr key={index}>
                                            <td className="col-color">#{index + 1}</td>
                                            <td className="symbol-color">{recommendation.symbol}</td>
                                            <td className={getActionColor(recommendation.action)}>{recommendation.action}</td>
                                            <td className="col-color">${recommendation.currentPrice}</td>
                                            <td className="col-color">${recommendation.targetPrice}</td>
                                            <td className="col-color">{(recommendation.confidence * 100).toFixed(1)}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PredictionPage;
                                                
                                                