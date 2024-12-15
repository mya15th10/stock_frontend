import "../style/market.css"
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./Context";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip } from 'recharts';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { historicalData } from '../data/market_datahistory';

function Market() {
    const { setOrder } = useContext(MyContext);
    const [stockData, setStockData] = useState([
        { symbol: 'VNM', price: 86000, change: 2.5, volume: 1200000 },
        { symbol: 'FPT', price: 92000, change: -1.2, volume: 800000 },
        { symbol: 'VIC', price: 98000, change: 0.8, volume: 1500000 },
    ]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [filteredData, setFilteredData] = useState(historicalData);
    const [searchSymbol, setSearchSymbol] = useState('');
    const navigate = useNavigate();

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
    }, [setOrder]);

    const handleSearch = () => {
        if (searchSymbol) {
            const filtered = historicalData.filter(item => 
                item.code?.toLowerCase() === searchSymbol.toUpperCase()
            );
            setFilteredData(filtered.length > 0 ? filtered : []);
            
            // Nếu tìm thấy data, set selectedStock
            if (filtered.length > 0) {
                setSelectedStock({
                    symbol: searchSymbol.toUpperCase(),
                    price: filtered[0].close_price,
                    change: filtered[0].change_percent,
                    volume: filtered[0].volume_detail
                });
            }
        } else {
            setFilteredData(historicalData);
            setSelectedStock(null);
        }
    };
    return (
        <div id="market-page">
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
                                    <AreaChart data={filteredData}>
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area 
                                            type="monotone" 
                                            dataKey="close_price" 
                                            stroke="#82ca9d" 
                                            fill="#82ca9d" 
                                            fillOpacity={0.3} 
                                        />
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
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch();
                                        }
                                    }}
                                    placeholder="Nhập mã cổ phiếu..."
                                />
                                <Search className="search-icon" size={20} onClick={handleSearch} />
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
                            <button className="btn-buy-stock" onClick={() => navigate('/login')}>
                                Mua cổ phiếu
                            </button>
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
                                {filteredData.map(data => (
                                    <tr key={data.session_id}>
                                        <td>{`${data.year}-${String(data.month).padStart(2, '0')}-${String(data.day_of_month).padStart(2, '0')}`}</td>
                                        <td>{data.close_price?.toLocaleString()}</td>
                                        <td>{data.adjust_price?.toLocaleString()}</td>
                                        <td className={data.change_percent >= 0 ? 'increase' : 'decrease'}>
                                            {data.change_percent}%
                                        </td>
                                        <td>{data.volume_detail?.toLocaleString()}</td>
                                        <td>{((data.volume_detail * data.close_price) / 1000000000).toFixed(2)}</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>{data.open_price?.toLocaleString()}</td>
                                        <td>{data.high_price?.toLocaleString()}</td>
                                        <td>{data.low_price?.toLocaleString()}</td>
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