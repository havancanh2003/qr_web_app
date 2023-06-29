import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./cartIcon.scss";
import cartIcon from "../../assets/image/cart-icon.jpg";
const cx = classNames.bind(style);
const Giohang = () => {
    const navigate = useNavigate();
    const [state, setState] = useState([]);
    const initialNum = 0;
    const [num, setNum] = useState(initialNum)
    const storedSession = JSON.parse(sessionStorage.getItem("obj")) || [];

    useEffect(() => {
        setState(storedSession);
        console.log(storedSession);
        let delta = 0;
        for(const item in storedSession){
            console.log(storedSession[item].quantity);
            delta = delta + storedSession[item].quantity
        }
        setNum(delta)
    }, []);

    
    return (
        <div className={cx("iconBorder")}>
            <button onClick={() => navigate("/cart")}>
                <div className={cx("notificationCart")}>
                    <p>{num}</p>
                </div>
                <img src={cartIcon}></img>
            </button>
        </div>
    )
}

export default Giohang;