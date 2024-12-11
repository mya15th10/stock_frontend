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

import dashboardActive from "../assets/dashboard/sidebar/dashboard-active.svg"
import portfolioActive from "../assets/dashboard/sidebar/portfolio-active.svg"
import predictionActive from "../assets/dashboard/sidebar/prediction-active.svg"
import historyActive from "../assets/dashboard/sidebar/history-active.svg"
import updateActive from "../assets/dashboard/sidebar/update-active.svg"

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

    // itemOrder represent the active card
    const [itemOrder, setItemOrder] = useState(3); // Default to 3 for Stock Prediction

    return (
        <div className="sidebar responsive-sidebar">
            <div></div>
            <Link to="/dashboard" onClick={() => setItemOrder(1)}>
                <Card icon={itemOrder === 1 ? dashboardActive : dashboard} text="Dashboard" active={itemOrder === 1} />
            </Link>
            <Link to="/dashboard" onClick={() => setItemOrder(2)}>
                <Card icon={itemOrder === 2 ? portfolioActive : portfolio} text="View portfolio" active={itemOrder === 2} />
            </Link>
            <Link to="/prediction" onClick={() => setItemOrder(3)}>
                <Card icon={itemOrder === 3 ? predictionActive : prediction} text="Stock prediction" active={itemOrder === 3} />
            </Link>
            <Link to="#" onClick={() => setItemOrder(4)}>
                <Card icon={itemOrder === 4 ? historyActive : history} text="Transaction history" active={itemOrder === 4} />
            </Link>
            <Link to="#" onClick={() => setItemOrder(5)}>
                <Card icon={itemOrder === 5 ? updateActive : update} text="Update personal information" active={itemOrder === 5} />
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

    // Sample data for price prediction chart
    const predictedPriceData = {
        '7d': [
            { date: '2024-12-11', actual: 86.5, predicted: 87.2 },
            { date: '2024-12-12', predicted: 87.8 },
            { date: '2024-12-13', predicted: 88.3 },
            { date: '2024-12-14', predicted: 88.9 },
            { date: '2024-12-15', predicted: 89.2 },
            { date: '2024-12-16', predicted: 89.8 },
            { date: '2024-12-17', predicted: 90.1 }
        ],
        '30d': [
            { date: '2024-12-11', actual: 86.5, predicted: 87.2 },
            { date: '2024-12-15', predicted: 88.5 },
            { date: '2024-12-20', predicted: 89.7 },
            { date: '2024-12-25', predicted: 90.8 },
            { date: '2024-12-30', predicted: 91.9 },
            { date: '2025-01-05', predicted: 92.7 },
            { date: '2025-01-10', predicted: 93.5 }
        ],
        '1y': [
            { date: '2024-12', actual: 86.5, predicted: 87.2 },
            { date: '2025-02', predicted: 89.5 },
            { date: '2025-04', predicted: 91.8 },
            { date: '2025-06', predicted: 93.4 },
            { date: '2025-08', predicted: 95.2 },
            { date: '2025-10', predicted: 96.8 },
            { date: '2025-12', predicted: 98.5 }
        ]
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

    // Stock predictions data
    const stockPredictions = [
        { symbol: 'VNM', openPrice: 86.5, closePrice: 87.2, confidence: 0.85 },
        { symbol: 'FPT', openPrice: 92.3, closePrice: 93.1, confidence: 0.78 },
        { symbol: 'VIC', openPrice: 98.2, closePrice: 99.0, confidence: 0.82 }
    ];

    const topRecommendations = [
        { symbol: 'VNM', action: 'BUY', confidence: 0.9, currentPrice: 86.00, targetPrice: 90.00 },
        { symbol: 'FPT', action: 'HOLD', confidence: 0.85, currentPrice: 92.00, targetPrice: 92.50 },
        { symbol: 'VIC', action: 'SELL', confidence: 0.88, currentPrice: 98.00, targetPrice: 95.00 }
    ];

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

                        {/* Price Prediction Chart */}
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={predictedPriceData[timeRange]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Price" strokeWidth={2} />
                                    <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="Predicted Price" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Market Trend Chart */}
                        <div className="chart-container">
                            <h3 className="text-xl font-bold text-gray-200 mb-4 mt-6">Market Trend Analysis</h3>
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

                        {/* Stock Predictions Table */}
                        <div className="search-container mb-6">
                            <input
                                type="text"
                                placeholder="Search stock symbol..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="prediction-search"
                            />
                        </div>

                        <div className="prediction-table-container">
                            <table className="prediction-table">
                                <thead>
                                    <tr>
                                        <th>Symbol</th>
                                        <th>Predicted Open</th>
                                        <th>Predicted Close</th>
                                        <th>Confidence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stockPredictions
                                        .filter(stock => stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((stock, index) => (
                                            <tr key={index}>
                                                <td className="symbol-color">{stock.symbol}</td>
                                                <td className="col-color">${stock.openPrice}</td>
                                                <td className="col-color">${stock.closePrice}</td>
                                                <td className="col-color">{(stock.confidence * 100).toFixed(1)}%</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Trading Recommendations Section */}
                    <div className="recommendation-section">
                        <h2 className="text-2xl font-bold text-gray-200 mb-4">Trading Recommendations</h2>
                        <div className="search-container mb-6">
                            <input
                                type="text"
                                placeholder="Search recommendations..."
                                value={recommendationSearch}
                                onChange={(e) => setRecommendationSearch(e.target.value)}
                                className="prediction-search"
                            />
                        </div>

                        <div className="recommendation-table-container">
                            <table className="prediction-table">
                                <thead>
                                    <tr>
                                        <th>Symbol</th>
                                        <th>Action</th>
                                        <th>Current Price</th>
                                        <th>Target Price</th>
                                        <th>Confidence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topRecommendations
                                        .filter(stock => stock.symbol.toLowerCase().includes(recommendationSearch.toLowerCase()))
                                        .map((recommendation, index) => (
                                            <tr key={index}>
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