import * as React from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./Cart.scss";
import leftArrow from "../../assets/image/left-arrow.png";
import cartImage from "../../assets/image/cua kì cục.webp";
import xIcon from "../../assets/image/x_icon_150997.png";
import plusIcon from "../../assets/image/plus_icon-icons.com_66718.png";
import minusIcon from "../../assets/image/free-minus-icon-3108-thumb.png";

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
        <p className={cx("topTitle")}>Món Bạn Đã Chọn</p>
      </div>
      <hr />
      <div className={cx("cartBody")}>
          <div className={cx("cartItem")}>
            <div className={cx("cartImage")}>
              <img src={cartImage}></img>
            </div>
            <div className={cx("cartInfo")}>
              <h3>CUA KÌ CỤC</h3>
              <h5>chiên giòn sốt chua ngọt</h5>
              <div className={cx("itemQuantity")} >
              <button className={cx("decrease")}>
                  <img src={minusIcon}></img>
                </button>
                <h4 className={cx("quantity")}>1</h4>
                <button className={cx("increase")}>
                  <img src={plusIcon}></img>
                </button>
              </div>
            </div>
            <div className={cx("cartAssets")}>
              <button>
                <img src={xIcon}></img>
              </button>
              <h4>100.000đ</h4>
            </div>
          </div><div className={cx("cartItem")}>
            <div className={cx("cartImage")}>
              <img src={cartImage}></img>
            </div>
            <div className={cx("cartInfo")}>
              <h3>CUA KÌ CỤC</h3>
              <h5>chiên giòn sốt chua ngọt</h5>
              <div className={cx("itemQuantity")} >
              <button className={cx("decrease")}>
                  <img src={minusIcon}></img>
                </button>
                <h4 className={cx("quantity")}>1</h4>
                <button className={cx("increase")}>
                  <img src={plusIcon}></img>
                </button>
              </div>
            </div>
            <div className={cx("cartAssets")}>
              <button>
                <img src={xIcon}></img>
              </button>
              <h4>100.000đ</h4>
            </div>
          </div><div className={cx("cartItem")}>
            <div className={cx("cartImage")}>
              <img src={cartImage}></img>
            </div>
            <div className={cx("cartInfo")}>
              <h3>CUA KÌ CỤC</h3>
              <h5>chiên giòn sốt chua ngọt</h5>
              <div className={cx("itemQuantity")} >
              <button className={cx("decrease")}>
                  <img src={minusIcon}></img>
                </button>
                <h4 className={cx("quantity")}>1</h4>
                <button className={cx("increase")}>
                  <img src={plusIcon}></img>
                </button>
              </div>
            </div>
            <div className={cx("cartAssets")}>
              <button>
                <img src={xIcon}></img>
              </button>
              <h4>100.000đ</h4>
            </div>
          </div><div className={cx("cartItem")}>
            <div className={cx("cartImage")}>
              <img src={cartImage}></img>
            </div>
            <div className={cx("cartInfo")}>
              <h3>CUA KÌ CỤC</h3>
              <h5>chiên giòn sốt chua ngọt</h5>
              <div className={cx("itemQuantity")} >
              <button className={cx("decrease")}>
                  <img src={minusIcon}></img>
                </button>
                <h4 className={cx("quantity")}>1</h4>
                <button className={cx("increase")}>
                  <img src={plusIcon}></img>
                </button>
              </div>
            </div>
            <div className={cx("cartAssets")}>
              <button>
                <img src={xIcon}></img>
              </button>
              <h4>100.000đ</h4>
            </div>
          </div><div className={cx("cartItem")}>
            <div className={cx("cartImage")}>
              <img src={cartImage}></img>
            </div>
            <div className={cx("cartInfo")}>
              <h3>CUA KÌ CỤC</h3>
              <h5>chiên giòn sốt chua ngọt</h5>
              <div className={cx("itemQuantity")} >
              <button className={cx("decrease")}>
                  <img src={minusIcon}></img>
                </button>
                <h4 className={cx("quantity")}>1</h4>
                <button className={cx("increase")}>
                  <img src={plusIcon}></img>
                </button>
              </div>
            </div>
            <div className={cx("cartAssets")}>
              <button>
                <img src={xIcon}></img>
              </button>
              <h4>100.000đ</h4>
            </div>
          </div><div className={cx("cartItem")}>
            <div className={cx("cartImage")}>
              <img src={cartImage}></img>
            </div>
            <div className={cx("cartInfo")}>
              <h3>CUA KÌ CỤC</h3>
              <h5>chiên giòn sốt chua ngọt</h5>
              <div className={cx("itemQuantity")} >
              <button className={cx("decrease")}>
                  <img src={minusIcon}></img>
                </button>
                <h4 className={cx("quantity")}>1</h4>
                <button className={cx("increase")}>
                  <img src={plusIcon}></img>
                </button>
              </div>
            </div>
            <div className={cx("cartAssets")}>
              <button>
                <img src={xIcon}></img>
              </button>
              <h4>100.000đ</h4>
            </div>
          </div><div className={cx("cartItem")}>
            <div className={cx("cartImage")}>
              <img src={cartImage}></img>
            </div>
            <div className={cx("cartInfo")}>
              <h3>CUA KÌ CỤC</h3>
              <h5>chiên giòn sốt chua ngọt</h5>
              <div className={cx("itemQuantity")} >
              <button className={cx("decrease")}>
                  <img src={minusIcon}></img>
                </button>
                <h4 className={cx("quantity")}>1</h4>
                <button className={cx("increase")}>
                  <img src={plusIcon}></img>
                </button>
              </div>
            </div>
            <div className={cx("cartAssets")}>
              <button>
                <img src={xIcon}></img>
              </button>
              <h4>100.000đ</h4>
            </div>
          </div><div className={cx("cartItem")}>
            <div className={cx("cartImage")}>
              <img src={cartImage}></img>
            </div>
            <div className={cx("cartInfo")}>
              <h3>CUA KÌ CỤC</h3>
              <h5>chiên giòn sốt chua ngọt</h5>
              <div className={cx("itemQuantity")} >
              <button className={cx("decrease")}>
                  <img src={minusIcon}></img>
                </button>
                <h4 className={cx("quantity")}>1</h4>
                <button className={cx("increase")}>
                  <img src={plusIcon}></img>
                </button>
              </div>
            </div>
            <div className={cx("cartAssets")}>
              <button>
                <img src={xIcon}></img>
              </button>
              <h4>100.000đ</h4>
            </div>
          </div>
          <div className={cx("cartItem")}>
            <div className={cx("cartImage")}>
              <img src={cartImage}></img>
            </div>
            <div className={cx("cartInfo")}>
              <h3>CUA KÌ CỤC</h3>
              <h5>chiên giòn sốt chua ngọt</h5>
              <div className={cx("itemQuantity")} >
              <button className={cx("decrease")}>
                  <img src={minusIcon}></img>
                </button>
                <h4 className={cx("quantity")}>1</h4>
                <button className={cx("increase")}>
                  <img src={plusIcon}></img>
                </button>
              </div>
            </div>
            <div className={cx("cartAssets")}>
              <button>
                <img src={xIcon}></img>
              </button>
              <h4>100.000đ</h4>
            </div>
          </div>

      </div>
      <div className={cx("cartTotal")}>
        <h2>Bạn đã chọn X món</h2>
        <hr />
        <div className={cx("totalBill")}>
          <p>Tổng hoá đơn</p>
          <p id={cx("totalPrice")}>949.000 đ</p>
        </div>
        <div className={cx("cartNote")}>
          <p>Ghi chú:</p>
          <textarea></textarea>
        </div>
        <button className={cx("totalBillButton")}>
          Gọi Món
        </button>
      </div>
    </div>
  );
}

export default Cart;
