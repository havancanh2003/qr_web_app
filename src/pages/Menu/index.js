import { FaAlignLeft, FaAirFreshener } from "react-icons/fa";
import { MdOutlineFreeBreakfast, MdOutlineLunchDining } from "react-icons/md";
import { BestDealFood } from "../../data/BestDealFood";
import { useState } from "react";
import { Fragment } from "react";
import classNames from "classnames/bind";
import style from "./Menu.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(style);

function Menu() {
  const [overlay, setOverlay] = useState(false);
  const [add, setAdd] = useState(false);
  const [showdetail, setShowDetail] = useState(false);
  return (
    <Fragment>
      <section
        onClick={() => {
          //setAdd(false);
        }}
      >
        <div className={cx("tiltle_container")}>
          <h3>Today's best deals</h3>
          <Link to={"/showall"}>SHOW ALL</Link>
        </div>
        <div className={cx("food_best_deal")}>
          {BestDealFood.map((food, index) => (
            <div
              onClick={() => (setShowDetail(true), setOverlay(true))}
              key={index}
              className={cx("box_food_1")}
            >
              <img src={food.src} alt="" />
              <div className={cx("about_food")}>
                <p>
                  {food.name} <br />
                  <span>{food.about}</span>
                </p>
                <span>{food.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* recommend */}
        <div className={cx("title_choose")}>
          <h3>Choose by Category</h3>
        </div>
        <div className={cx("recomment_categorys")}>
          <div className={cx("category")}>
            <MdOutlineFreeBreakfast />
            <span>Breakfast</span>
          </div>
          <div className={cx("category")}>
            <MdOutlineLunchDining />
            <span>Lunch</span>
          </div>
          <div className={cx("category")}>
            <FaAirFreshener />
            <span>Drink</span>
          </div>
        </div>
        {combos.map((combo) => (
          <div className={cx("combo")}>
            <div key={combo.id} className={cx("combo_img")}>
              <img src={combo.src_img} alt="" />
            </div>
            <div className={cx("combo_about")}>
              <h4>{combo.tile}</h4>
              <p>{combo.about}</p>
              <span>{combo.price}</span>
            </div>
          </div>
        ))}
      </section>
      {overlay && (
        <div
          onClick={() => {
            setOverlay(false);
            setShowDetail(false);
          }}
          className={cx("overlay")}
        ></div>
      )}
      {showdetail && (
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
              <button onClick={() => setAdd(true)}>Add to Cart</button>
            </div>
          </div>
          {add && (
            <div className={cx("showa")}>
              <ion-icon
                className={cx("icon")}
                onClick={() => (
                  setAdd(false), setOverlay(false), setShowDetail(false)
                )}
                name="close-outline"
              ></ion-icon>
              <div className={cx("done")}>
                <ion-icon name="checkmark-outline"></ion-icon>
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
}

export default Menu;
const combos = [
  {
    id: "cb1",
    src_img:
      "https://www.allrecipes.com/thmb/AYZbeG_jbkslFw0ZdVap62wD86Y=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7499125-baked-caesar-chicken-DDMFS-beauty-4x3-BG-9353-6aae9a89fac546a8b5f3ed38c3f44cb8.jpg",
    tile: "Lunch",
    about: "The href attribute requires a valid value to be accessible.",
    price: "199.000",
  },
  {
    id: "cb2",
    src_img:
      "https://www.allrecipes.com/thmb/AYZbeG_jbkslFw0ZdVap62wD86Y=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7499125-baked-caesar-chicken-DDMFS-beauty-4x3-BG-9353-6aae9a89fac546a8b5f3ed38c3f44cb8.jpg",
    tile: "Breakfast",
    about: "The href attribute requires a valid value to be accessible.",
    price: "199.000",
  },
];
