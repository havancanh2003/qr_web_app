import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import style from "./DetailButtonFood.module.scss";
const cx = classNames.bind(style);

const DetailButtonFood = (props) => {
  // console.log(props.obj);
  const op = props.obj.options;
  //const [showDetail, setShowDetail] = useState(true);

  const [add, setAdd] = useState(false);
  function addDetail() {
    setAdd(true);
    sessionStorage.setItem("name", props.obj.name);
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
                  <ion-icon name="add-circle"></ion-icon>
                  <span>0</span>
                  <ion-icon name="remove-circle"></ion-icon>
                </div>
              </div>
            </div>
            <div className={cx("container")}>
              {op.map((item) => (
                <div className={cx("container_note")}>
                  <label>{item}</label>
                  <input type="checkbox" name="check" />
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
