import * as React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./Cart.scss";
import leftArrow from "../../assets/image/left-arrow.png";
import cartImage from "../../assets/image/cua kì cục.webp";
import xIcon from "../../assets/image/x_icon_150997.png";
import plusIcon from "../../assets/image/plus_icon-icons.com_66718.png";
import minusIcon from "../../assets/image/free-minus-icon-3108-thumb.png";
import { sessionStorage } from "../../data/SessionStorage";
const cx = classNames.bind(style);

function Cart() {
  const navigate = useNavigate();
  const [cartStored, setCartStored] = useState();
  // const [PostData, setPostData] = useState();

  useEffect(() => {
    setCartStored(sessionStorage);
  }, []);
console.log(cartStored);
  if (!cartStored) {
    return <div>Loading...</div>;
  }
  const totalBill = cartStored.reduce(
    (total, food) => total + food.price * food.number,
    0
  );
  return (
    <div>
      <div className={cx("topCart")}>
        <button className={cx("backButton")} onClick={() => navigate("")}>
          <img src={leftArrow} alt="icon"></img>
        </button>
        <p className={cx("topTitle")}>Món Bạn Đã Chọn</p>
      </div>
      <hr />
      <div className={cx("cartBody")}>
        {cartStored.map((food, index) => (
          <div className={cx("cartItem")} key={index}>
            <div className={cx("cartImage")}>
              <img src={food.image_detail.path}></img>
            </div>
            <div className={cx("cartInfo")}>
              <h3>{food.name}</h3>
              <h5>{food.options}</h5>
              <div className={cx("itemQuantity")}>
                <button className={cx("decrease")}>
                  <img src={minusIcon}></img>
                </button>
                <h4 className={cx("quantity")}>{food.number}</h4>
                <button className={cx("increase")}>
                  <img src={plusIcon}></img>
                </button>
              </div>
            </div>
            <div className={cx("cartAssets")}>
              <button>
                <img src={xIcon}></img>
              </button>
              <h4>{food.price * food.number}đ</h4>
            </div>
          </div>
        ))}
      </div>
      <div className={cx("cartTotal")}>
        <h2>Bạn đã chọn {cartStored.length} món</h2>
        <hr />
        <div className={cx("totalBill")}>
          <p>Tổng hoá đơn:</p>
          <p id={cx("totalPrice")}>{totalBill} đ</p>
        </div>
        <div className={cx("cartNote")}>
          <p>Ghi chú:</p>
          <textarea></textarea>
        </div>
        <button className={cx("totalBillButton")}>Gọi Món</button>
      </div>
    </div>
  );
}

export default Cart;
