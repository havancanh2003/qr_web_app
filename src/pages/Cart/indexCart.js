import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./Cart.scss";
import axios from "axios";
import leftArrow from "../../assets/image/left-arrow.png";
import xIcon from "../../assets/image/x_icon_150997.png";
import plusIcon from "../../assets/image/plus_icon-icons.com_66718.png";
import minusIcon from "../../assets/image/free-minus-icon-3108-thumb.png";
import { sessionStorageDummy } from "../../data/SessionStorage";
const cx = classNames.bind(style);

function Cart() {
  const navigate = useNavigate();
  const [cartStored, setCartStored] = useState([]);
  const [isSucess, setIsSucess] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false)
  const [pushData, setPushData] = useState({
    note: "",
    total: "",
    table: "",
    order: [
      {
        dish_id: "",
        number: "",
        options: [],
      },
    ],
  });

  // const tableStored = sessionStorage.getItem("table");
  const tableStored = 5;
  useEffect(() => {
    setCartStored(sessionStorageDummy);
  }, []);

  const getTotalBill = () => {
    return cartStored.reduce(
      (total, food) => total + food.price * food.number,
      0
    );
  };
  const getOrderData = () => {
    return cartStored.map((food) => ({
      dish_id: food.id,
      number: food.number,
      options: food.options,
    }));
  };
  // Function to increase the quantity of an item
  const increaseQuantity = (index) => {
    const updatedCart = [...cartStored];
    updatedCart[index].number += 1;
    setCartStored(updatedCart);
  };

  // Function to decrease the quantity of an item
  const decreaseQuantity = (index) => {
    const updatedCart = [...cartStored];
    if (updatedCart[index].number > 1) {
      updatedCart[index].number -= 1;
      setCartStored(updatedCart);
    }
  };
  const removeItem = (index) => {
    const updatedCart = [...cartStored];
    updatedCart.splice(index, 1);
    setCartStored(updatedCart);
  };

  useEffect(() => {
    setPushData((prevState) => ({
      ...prevState,
      total: getTotalBill(),
      order: getOrderData(),
      table: tableStored,
    }));
  }, [cartStored, tableStored]);
  useEffect(() => {
    setIsSucess(false);
  }, [pushData]);

  if (!cartStored) {
    return <div>Loading...</div>;
  }
  console.log(pushData);
  const confirmHandler = () => {
    setIsConfirm(true);
  }
  const cancelHandler = () => {
    setIsConfirm(false);
  }
  const submitHandler = () => {
    axios
      .post("http://117.4.194.207:3003/cart/create", pushData)
      .then((response) => {
        console.log(response);
        setIsSucess(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {isConfirm && (
        <div className={cx("sucessContainer")} onClick={cancelHandler}>
          <div className="sucessBox">
            <h2 className={cx("sucessPopup")}>Xác Nhận Đặt Món</h2>
            <div className="confirmButtonGroup">
              <button onClick={cancelHandler}>Huỷ</button>
              <button onClick={submitHandler}>Xác Nhận</button>
            </div>

          </div>
        </div>
      )}
      {isSucess && (
        <div className={cx("sucessContainer")}>
          <div className="sucessBox">
            <h2 className={cx("sucessPopup")}>Gọi món thành công</h2>
            <button onClick={() => navigate("/showall")}>Trở về</button>
          </div>
        </div>
      )}
      <div className={cx("topCart")}>
        <button className={cx("backButton")} onClick={() => navigate("/menu")}>
          <img src={leftArrow} alt="icon" />
        </button>
        <p className={cx("topTitle")}>Món Bạn Đã Chọn</p>
      </div>
      <hr />
      <div className={cx("cartBody")}>
        {cartStored.map((food, index) => (
          <div className={cx("cartItem")} key={index}>
            <div className={cx("cartImage")}>
              <img src={food.image_detail.path} alt="ảnh"/>
            </div>
            <div className={cx("cartInfo")}>
              <h3>{food.name}</h3>
              <h5>{food.options}</h5>
              <div className={cx("itemQuantity")}>
                <button
                  className={cx("decrease")}
                  onClick={() => decreaseQuantity(index)}
                >
                  <img src={minusIcon} alt="minus" />
                </button>
                <h4 className={cx("quantity")}>{food.number}</h4>
                <button
                  className={cx("increase")}
                  onClick={() => increaseQuantity(index)}
                >
                  <img src={plusIcon} alt="plus" />
                </button>
              </div>
            </div>
            <div className={cx("cartAssets")}>
              <button onClick={() => removeItem(index)}>
                <img src={xIcon} alt="remove" />
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
          <p id={cx("totalPrice")}>{pushData.total} đ</p>
        </div>
        <div className={cx("cartNote")}>
          <p>Ghi chú:</p>
          <textarea
            value={pushData.note}
            onChange={(e) =>
              setPushData((prevState) => ({
                ...prevState,
                note: e.target.value,
              }))
            }
          />
        </div>
        <button className={cx("totalBillButton")} onClick={confirmHandler}>
          Gọi Món
        </button>
      </div>
    </div>
  );
}

export default Cart;
