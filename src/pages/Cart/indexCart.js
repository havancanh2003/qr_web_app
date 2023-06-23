import * as React from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./Cart.scss";
import leftArrow from "../../assets/image/left-arrow.png";
const cx = classNames.bind(style);
function Cart() {
  const navigate = useNavigate()
  return (
    <div>
      <div className={cx("topCart")}>
        <button className={cx("backButton")}
        onClick={() => navigate("")}
        >
        <img src={leftArrow} alt="icon"></img>
        </button>
        <p className={cx("topTitle")}>Cart</p>
      </div>
      <hr />
      <div className={cx("cartBody")}>
        <div className={cx("cartDetail")}>
          <div></div>
        </div>
        <div className={cx("cartTotal")}>
          <p>Bạn đã chọn X món</p>
          <hr />
          <div className={cx("totalBill")}>
            <p>Tổng hoá đơn</p>
            <p id={cx("totalPrice")}>949.000 đ</p>
          </div>
          <div className={cx("cartNote")}>
            <p>Ghi chú:</p>
            <input></input>
          </div>
          <button className={cx("totalBillButton")}>
            Gọi Món
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
