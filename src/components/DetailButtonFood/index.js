import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import style from "./DetailButtonFood.module.scss";
const cx = classNames.bind(style);

const DetailButtonFood = (props) => {
  //console.log(props.state);
  //const [showDetail, setShowDetail] = useState(true);

  const [add, setAdd] = useState(false);
  function addDetail() {
    setAdd(true);
  }
  //a ? setShowDetail(true) : setShowDetail(false);
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
                <img
                  src="https://www.allrecipes.com/thmb/wQCrv01gJqlIFM1AnCjODW3fZ0g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/14253-Taco-Salad-ddmfs-016-4x3-1-8c152400b3a2465fbaff684bdda0a264.jpg"
                  alt=""
                />
              </div>
              <div className={cx("about_product")}>
                <h4>Salad ceaser</h4>
                <p>React Hook useEffect has missing dependencies:</p>
                <span>149.000d</span>
                <div className={cx("quantity")}>
                  <ion-icon name="add-circle"></ion-icon>
                  <span>0</span>
                  <ion-icon name="remove-circle"></ion-icon>
                </div>
              </div>
            </div>
            <div className={cx("container")}>
              <div className={cx("container_note")}>
                <label>Olive</label>
                <input type="checkbox" name="check" />
              </div>
              <div className={cx("container_note")}>
                <label>Lemon</label>
                <input type="checkbox" name="check" />
              </div>
              <div className={cx("container_note")}>
                <label>Olive</label>
                <input type="checkbox" name="check" />
              </div>
              <div className={cx("container_note")}>
                <label>Lemon</label>
                <input type="checkbox" name="check" />
              </div>
              <div className={cx("container_note")}>
                <label>Olive</label>
                <input type="checkbox" name="check" />
              </div>
              <div className={cx("container_note")}>
                <label>Lemon</label>
                <input type="checkbox" name="check" />
              </div>
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
