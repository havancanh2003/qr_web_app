import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import style from "./AddOrder.scss";
import plusIcon from "../../assets/image/plus_icon-icons.com_66718.png";
import minusIcon from "../../assets/image/free-minus-icon-3108-thumb.png";
const cx = classNames.bind(style);

const AddOrder = (props) => {
  const op = props.obj.options;
  const lishDish = props.listDish;
  const [add, setAdd] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [notEnoughQuantity, setNotEnoughQuantity] = useState(false);
  const [check, setCheck] = useState("");
  const [foodFailName, setFoodFailName] = useState("");
  const [amoutRemain, setAmountRemain] = useState(0);
  const arrayFood = [];

  function addDetail() {
    let food = {
      id: props.obj._id,
      img: props.obj.image_detail.path,
      name: props.obj.name,
      price: props.obj.price,
      category: props.obj.category,
      number: quantity,
      options: check,
    };
    let data = JSON.parse(sessionStorage.getItem("obj"));
    if (data === null) {
      arrayFood.push(food);
      sessionStorage.setItem("obj", JSON.stringify(arrayFood));
    } else {
      let existingItem = data.find(
        (item) => item.id === food.id && item.options === food.options
      );
      if (existingItem) {
        existingItem.number += food.number;
      } else {
        data.push(food);
      }
      sessionStorage.setItem("obj", JSON.stringify(data));
    }
    setAdd(true);
  }

  function decrease() {
    if (quantity === 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  }

  function increase(id) {
    let data = JSON.parse(sessionStorage.getItem("obj"));
    let dish = lishDish.find((item) => item._id === id);
    let availableQuantity = dish.amount;
    let existingItems = data.filter((item) => item.id === id); // Lọc ra tất cả các existingItem có cùng id
    if (existingItems) {
      let totalExistingQuantity = 0;
      existingItems.forEach((existingItem) => {
        totalExistingQuantity += existingItem.number; // Cộng dồn số lượng của từng existingItem
      });
      if (quantity + totalExistingQuantity >= availableQuantity) {
        const foodFailName = dish.name;
        setFoodFailName(foodFailName);
        setAmountRemain(availableQuantity);
        setNotEnoughQuantity(true);
      } else {
        setQuantity(quantity + 1);
      }
    } else {
      if (quantity > availableQuantity) {
        const foodFailName = dish.name;
        setFoodFailName(foodFailName);
        setAmountRemain(availableQuantity);
        setNotEnoughQuantity(true);
      } else {
        setQuantity(quantity + 1);
      }
    }
  }
  return (
    <Fragment>
      <div>
        <div className={cx("addOrderBox")}>
          <div className={cx("itemContent")}>
            <div className={cx("product")}>
              <div className={cx("img_product")}>
                <img src={props.obj.image_detail.path} alt="" />
              </div>
              <div className={cx("about_product")}>
                <h4>{props.obj.name}</h4>
                <p>{props.obj.description}</p>
                {/* <span>{props.obj.price}đ</span> */}
                <div className={cx("quantity")}>
                  <button onClick={decrease} name="remove-circle">
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    // onClick={() => setQuantity(quantity + 1)}
                    onClick={() => increase(props.obj._id)}
                    name="add-circle"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className={cx("optionContainer")}>
              {op.map((item, index) => (
                <div key={item} className={cx("optionCheck")}>
                  <label htmlFor={index}>{item}</label>
                  <input
                    onClick={() => setCheck(item)}
                    type="radio"
                    name="check"
                    value={item}
                    id={index}
                  />
                </div>
              ))}
            </div>
            <div className={cx("addCart")}>
              <button onClick={addDetail}>Add to Cart</button>
            </div>
          </div>

          {add && (
            <div className={cx("successOrder")}>
              <div className={cx("successBox")}>
                <ion-icon name="checkmark-outline"></ion-icon>
              </div>
            </div>
          )}
          {notEnoughQuantity && (
            <div className={cx("successOrder")}>
              <div className={cx("successBox")}>
                <p>
                  Món {foodFailName} còn {amoutRemain} món
                </p>
                <p>Bạn có muốn điều chỉnh?</p>{" "}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* )} */}
    </Fragment>
  );
};

export default AddOrder;
