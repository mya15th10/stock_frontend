
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "./Context";


function ProtectedPage({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { setUserName, isLogin, SetIsLogin, useBackend } = useContext(MyContext);


    useEffect(() => {
        try {
            const token = localStorage.getItem("accessToken");
            const payload = JSON.parse(atob(token.split('.')[1]));
            const isExpired = Date.now() >= payload.exp * 1000;
            if(!isExpired) {
                console.log(payload)
                setUserName(payload.sub);
                SetIsLogin(true);
            }
            else {
                navigate("/login");
            }
        } catch(error) {
            if(useBackend)
                navigate("/login");
        } finally {
            setLoading(false);
        }
    }, [navigate, SetIsLogin, setUserName])

    useEffect(() => {
        if(isLogin === false && loading === false) {
            localStorage.removeItem("accessToken");
            navigate("/login");
        }
            
    }, [isLogin, navigate])

    if(loading === false)
        return <>{children}</>
}

export default ProtectedPage;