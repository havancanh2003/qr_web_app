import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import style from "./DetailButtonFood.module.scss";
const cx = classNames.bind(style);

const DetailButtonFood = (props) => {
  // console.log(props.obj);
  //const [showDetail, setShowDetail] = useState(true);
  const op = props.obj.options;
  //console.log(op);

  const [add, setAdd] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [check, setCheck] = useState("");
  const arrayFood = [];
  //const [arrayFood, setArrFood] = useState([]);
  //console.log(arrayFood);
  function addDetail() {
    setAdd(true);
    let food = {
      id: props.obj._id,
      img: props.obj.image_detail.path,
      name: props.obj.name,
      price: props.obj.price,
      category: props.obj.category,
      quantity: quantity,
      note: check,
    };
    let data = JSON.parse(sessionStorage.getItem("obj"));
    //console.log(data);
    if (data === null) {
      arrayFood.push(food);
      console.log(arrayFood);
      sessionStorage.setItem("obj", JSON.stringify(arrayFood));
    } else {
      let data = JSON.parse(sessionStorage.getItem("obj"));
      data.push(food);
      console.log(data);
      sessionStorage.setItem("obj", JSON.stringify(data));
    }
  }
  function remove() {
    if (quantity === 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  }
  return (
    <Fragment>
      {/* {showDetail && ( */}
      <Fragment>
        {/* <div
            className={cx("overlay")}
            onClick={() => setShowDetail(false)}
          ></div> */}
        <div className={cx("footer")}>
          <div className={cx("box_note")}>
            <div className={cx("product")}>
              <div className={cx("img_product")}>
                <img src={props.obj.image_detail.path} alt="" />
              </div>
              <div className={cx("about_product")}>
                <h4>{props.obj.name}</h4>
                <p>{props.obj.category}</p>
                <span>{props.obj.price}</span>
                <div className={cx("quantity")}>
                  <ion-icon
                    onClick={() => setQuantity(quantity + 1)}
                    name="add-circle"
                  ></ion-icon>
                  <span>{quantity}</span>
                  <ion-icon onClick={remove} name="remove-circle"></ion-icon>
                </div>
              </div>
            </div>
            <div className={cx("container")}>
              {op.map((item) => (
                <div key={item} className={cx("container_note")}>
                  <label>{item}</label>
                  <input
                    onClick={() => setCheck(item)}
                    type="radio"
                    name="check"
                    value={item}
                  />
                </div>
              ))}
            </div>
            <div className={cx("addCart")}>
              <button onClick={addDetail}>Add to Cart</button>
            </div>
          </div>

          {add && (
            <div className={cx("showa")}>
              {/* <ion-icon
                  className={cx("icon")}
                  name="close-outline"
                  onClick={() => setShowDetail(false)}
                ></ion-icon> */}
              <div className={cx("done")}>
                <ion-icon name="checkmark-outline"></ion-icon>
              </div>
            </div>
          )}
        </div>
      </Fragment>
      {/* )} */}
    </Fragment>
  );
};

export default DetailButtonFood;
