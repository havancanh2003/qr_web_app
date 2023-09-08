import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./BillIcon.scss";
// import cartIcon from "../../assets/image/cart-icon.jpg";
import bIcon from "../../assets/image/historyIcon.png";
const cx = classNames.bind(style);
function IconBill() {
    const navigate = useNavigate();

    return (  
        <Fragment>
            <div className={cx("biWrapper")}>
                <img src={bIcon} alt="Hoá Đơn" onClick={() => {navigate("/billhistory")}}></img>
            </div>
        </Fragment>
    )
}

export default IconBill;
