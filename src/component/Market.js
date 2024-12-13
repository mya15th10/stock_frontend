import "../style/market.css"
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./Context";
import Navbar from "./Navbar";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip } from 'recharts';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';


function Market() {
    const { setOrder } = useContext(MyContext);
    const [stockData, setStockData] = useState([
        { symbol: 'VNM', price: 86000, change: 2.5, volume: 1200000 },
        { symbol: 'FPT', price: 92000, change: -1.2, volume: 800000 },
        { symbol: 'VIC', price: 98000, change: 0.8, volume: 1500000 },
    ]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [historicalData, setHistoricalData] = useState([]);
    const [searchSymbol, setSearchSymbol] = useState('');
    const navigate = useNavigate(); // Hook để điều hướng


    const tabs = [
        "Lịch sử giá",
        "Thống kê đặt lệnh",
        "Khối ngoại",
        "Tự doanh",
        "Khớp lệnh theo phiên",
        "Cổ đông & Nội bộ"
    ];
    useEffect(() => {
        setOrder(1);
        fetchHistoricalData('VNINDEX');
    }, [setOrder]);

    const fetchHistoricalData = async (symbol) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/stockprice/history/${symbol}`);
            setHistoricalData(response.data);
        } catch (error) {
            console.error('Error fetching historical data:', error);
        }
    };
    const handleSearch = () => {
        if (searchSymbol) {
            fetchHistoricalData(searchSymbol.toUpperCase());
        }
    };
    return (
        <div id="market-page">
            {/* <Navbar /> */}
            <div className="market-content">
                <div className="top-section">
                    <div className="stock-table">
                        <h3 className="top-stocks-header">Top 10 Cổ phiếu</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã CP</th>
                                    <th>Giá</th>
                                    <th>Thay đổi</th>
                                    <th>Khối lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockData.map(stock => (
                                    <tr key={stock.symbol} onClick={() => setSelectedStock(stock)}>
                                        <td>{stock.symbol}</td>
                                        <td>{stock.price.toLocaleString()}</td>
                                        <td className={stock.change >= 0 ? 'increase' : 'decrease'}>
                                            {stock.change}%
                                        </td>
                                        <td>{stock.volume.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="stock-chart">
                        {selectedStock && (
                            <>
                                <h2>{selectedStock.symbol}</h2>
                                <ResponsiveContainer width="100%" height={400}>
                                    <AreaChart data={historicalData}>
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="closePrice" 
                                              stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </>
                        )}
                    </div>

                    <div className="news-panel">
                        <h3>Tin tức thị trường</h3>
                        <div className="news-card">
                            <h4>Thị trường chứng khoán ngày 9/12</h4>
                            <p>Tổng quan diễn biến thị trường...</p>
                        </div>
                    </div>
                </div>

                <div className="historical-section">
                    <h2 className="historical-title">Dữ liệu lịch sử</h2>
                    
                    <div className="tabs">
                        {tabs.map(tab => (
                            <button key={tab} className="tab-button">{tab}</button>
                        ))}
                    </div>

                    <div className="search-bar">
                        <div className="search-input">
                            <label>Mã chứng khoán</label>
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    value={searchSymbol}
                                    onChange={(e) => setSearchSymbol(e.target.value)}
                                    placeholder="VNINDEX"
                                />
                                <Search className="search-icon" size={20} />
                            </div>
                        </div>

                        <div className="date-filter">
                            <label>Thời gian</label>
                            <select className="time-select">
                                <option>Chọn khoảng thời gian</option>
                            </select>
                        </div>

                        <div className="action-buttons">
                            <button className="btn-view" onClick={handleSearch}>Xem</button>
                            <button className="btn-export">Xuất Excel</button>
                            <button className="btn-buy-stock"
                            onClick={() => navigate('/login')}>Mua cổ phiếu</button>
                        </div>
                    </div>

                    <div className="historical-table">
                        <table>
                            <thead>
                                <tr>
                                    <th rowSpan="2">Ngày</th>
                                    <th colSpan="2">Giá (nghìn VND)</th>
                                    <th rowSpan="2">Thay đổi</th>
                                    <th colSpan="2">GD khớp lệnh</th>
                                    <th colSpan="2">GD thỏa thuận</th>
                                    <th colSpan="3">Giá (nghìn VND)</th>
                                </tr>
                                <tr>
                                    <th>Đóng cửa</th>
                                    <th>Điều chỉnh</th>
                                    <th>Khối lượng</th>
                                    <th>Giá trị (tỷ VND)</th>
                                    <th>Khối lượng</th>
                                    <th>Giá trị (tỷ VND)</th>
                                    <th>Mở cửa</th>
                                    <th>Cao nhất</th>
                                    <th>Thấp nhất</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historicalData.map(data => (
                                    <tr key={data.date}>
                                    <td>{data.date}</td>
                                    <td>{data.closePrice?.toLocaleString()}</td>
                                    <td>{data.closePrice?.toLocaleString()}</td>
                                    <td className={data.change >= 0 ? 'increase' : 'decrease'}>
                                        {data.change}%
                                    </td>
                                    <td>{data.volume?.toLocaleString()}</td>
                                    <td>{((data.volume * data.closePrice) / 1000000000).toFixed(2)}</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>{data.openPrice?.toLocaleString()}</td>
                                    <td>{data.highPrice?.toLocaleString()}</td>
                                    <td>{data.lowPrice?.toLocaleString()}</td>
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

export default Market;

                
            