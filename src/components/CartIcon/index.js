import React from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./cartIcon.scss";
import cartIcon from "../../assets/image/cart-icon.jpg";
const cx = classNames.bind(style);

const Giohang = () => {
    const navigate = useNavigate();
    return (
        <div className={cx("iconBorder")}>
            <button onClick={() => navigate("/cart")}>
                <div className={cx("notificationCart")}>
                    <p>2</p>
                </div>
                <img src={cartIcon}></img>
            </button>
        </div>
    )
}

export default Giohang;