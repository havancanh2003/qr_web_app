import React from "react";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./AddOrder.scss";
import plusIcon from "../../assets/image/plus_icon-icons.com_66718.png";
import minusIcon from "../../assets/image/free-minus-icon-3108-thumb.png";
import tickIcon from "../../assets/image/Flat_tick_icon.svg.png";
const cx = classNames.bind(style);

const AddOrder = (props) => {
  const opt = props.obj.options;
  const lishDish = props.listDish;
  const [add, setAdd] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [notEnoughQuantity, setNotEnoughQuantity] = useState(false);
  const [foodFailName, setFoodFailName] = useState("");
  const [amoutRemain, setAmountRemain] = useState(0);
  const [optionList, setOptionList] = useState([]);
  const arrayFood = [];


  useEffect(() => {
    let timer;
    if (add) {
      timer = setTimeout(() => {
        props.onAddSuccess();
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [add, props]);

  function handleSelectOption(optionName, optionPrice) {
    // Check if the option already exists in the list
    const optionExists = optionList.some((option) => option.name === optionName && option.price === optionPrice);

    if (optionExists) {
      // If the option exists, remove it from the list
      const updatedOptionList = optionList.filter((option) => !(option.name === optionName && option.price === optionPrice));
      setOptionList(updatedOptionList);
    } else {
      if (optionPrice === 0) {
        // If the optionPrice is 0, remove any existing options with the same name
        const updatedOptionList = optionList.filter((option) => option.name !== optionName);
        setOptionList(updatedOptionList);
      } else {
        // If the option doesn't exist, add it to the list
        const newOption = { name: optionName, price: optionPrice };
        setOptionList([...optionList, newOption]);
      }
    }
  }


  console.log(optionList);

  function addDetail() {
    let food = {
      id: props.obj._id,
      img: props.obj.image_detail.path,
      name: props.obj.name,
      price: props.obj.price,
      category: props.obj.category,
      number: quantity,
      options: optionList,
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

  function cancelHandler() {
    setNotEnoughQuantity(false)
  }

  function decrease() {
    if (quantity === 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  }

  function increase(id) {
    let data = JSON.parse(sessionStorage.getItem("obj")) || [];
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
                  <button onClick={decrease}
                  >
                    <img src={minusIcon} alt="minus"></img>
                  </button>
                  <span>{quantity}</span>
                  <button
                    // onClick={() => setQuantity(quantity + 1)}
                    onClick={() => increase(props.obj._id)}
                  >
                    <img src={plusIcon} alt="plus"></img>
                  </button>
                </div>
              </div>
            </div>
            <div className={cx("optionContainer")}>
              {opt.map((item, index) => {
                const isSelected = optionList.some(
                  (option) => option.name === item.name && option.price === item.price
                );

                return (
                  <div
                    key={item._id}
                    className={cx("optionItem", { selectedOption: isSelected })}
                    onClick={() => handleSelectOption(item.name, item.price)}
                  >
                    <div className={cx("optionName")}>{item.name}</div>
                    <div className={cx("optionPrice")}>
                      {item.price === null ? "0đ" : `${item.price.toLocaleString("vn-VN", { currency: "VND" })}đ`}
                    </div>

                  </div>
                );
              })}

            </div>
            <div className={cx("addCart")}>
              <button onClick={addDetail}>Thêm Vào Giỏ Hàng</button>
            </div>
          </div>

          {add && (
            <div className={cx("successOrder")}>
              <div className={cx("successBox")}>
                <img src={tickIcon}></img>
              </div>
            </div>
          )}
          {notEnoughQuantity && (
            <div className={cx("successOrder")}>
              <div className={cx("notEnoughBox")}>
                <p className={cx("notEnoughNote")}>
                  Món {foodFailName} còn {amoutRemain} món
                </p>
                <p className={cx("notEnoughNote")}>
                  Bạn có muốn điều chỉnh?
                </p>
                <button onClick={cancelHandler}>
                  Trở về
                </button>
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
