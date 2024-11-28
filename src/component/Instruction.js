import "../style/instruction.css"

import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { MyContext } from "./Context";

function Instruction() {
    // Set order of component on Navbar
    const { setOrder } = useContext(MyContext);
    useEffect(() => {
        setOrder(2);
    }, [])
    const { t } = useTranslation("instruction");
    
    return (
        <div className="instruction-page">
            {/* <Navbar /> */}
            <div className="instruction-section">
                <div className="instruction-title">
                    <h2>{t("title")}</h2>
                    <p>{t("welcome")}</p>
                </div>
                <div className="instruction-content">
                    <div className="left-content">
                        <div className="ordered-box-section">
                            <div className="order-box">
                                <div className="order-number">
                                    <p className=""><a href="#market-overview">1</a></p>
                                </div>
                                <div className="order-content">
                                    <p><a href="#market-overview">{t("how-to-view")} <br />{t("how-to-view1")}</a></p>
                                </div>
                            </div>
                            <div className="order-box">
                                <div className="order-number">
                                    <p className=""><a href="#login">2</a></p>
                                </div>
                                <div className="order-content">
                                    <p><a href="#login">{t("login")}<br />
                                        {t("login1")} <br />
                                        {t("login2")}</a></p>
                                </div>
                            </div>
                            <div className="order-box">
                                <div className="order-number">
                                    <p className=""><a href="#analysis">3</a></p>
                                </div>
                                <div className="order-content">
                                    <p><a href="#analysis">{t("analysis")} <br />
                                       {t("analysis1")}</a></p>
                                </div>
                            </div>
                            <div className="order-box">
                                <div className="order-number">
                                    <p className=""><a href="#view">4</a></p>
                                </div>
                                <div className="order-content">
                                    <p><a href="#view">{t("account-info")} <br />
                                        {t("account-info1")} <br />
                                        {t("account-info2")}</a></p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="right-content">
                        
                            <h4 id="market-overview">{t("content1")}</h4>
                            <ul>
                                <li>{t("content1-1")}</li>
                                <ul>
                                    <li>{t("content1-1-1")}</li>
                                    <li>{t("content1-1-2")}</li>
                                    <li>{t("content1-1-3")}</li>
                                </ul>
                            </ul>
                            <h4 id="login">{t("content2")}</h4>
                            <ul>
                                <li>{t("content2-1")} </li>
                                <ul>
                                    <li>{t("content2-1-1")} </li>
                                    <li>{t("content2-1-2")}</li>
                                    <li>{t("content2-1-3")} </li>
                                    <li>{t("content2-1-3")}</li>
                                </ul>
                            </ul>
                            <h4 id="analysis">{t("content3")} </h4>
                            <ul>
                                <li>{t("content3-1")} </li>
                                <ul>
                                    <li>{t("content3-1-1")} </li>
                                </ul>
                            </ul>
                            <h4 id="view">{t("content4")}</h4>
                            <ul>
                                <li>Something:</li>
                            </ul>
                        
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default Instruction;