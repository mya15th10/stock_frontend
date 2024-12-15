import {  createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [isLogin, SetIsLogin] = useState(false);

    // Order of current component in Navbar
    const [order, setOrder] = useState(1);
    const [userName, setUserName] = useState("")

    const useBackend = false;

    return (
        <MyContext.Provider value={{ isLogin, SetIsLogin, order, setOrder, userName, setUserName, useBackend }} >
            {children}
        </MyContext.Provider>
    );
}