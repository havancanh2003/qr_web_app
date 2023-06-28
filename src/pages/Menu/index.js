import { FaAirFreshener } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { MdOutlineFreeBreakfast, MdOutlineLunchDining } from "react-icons/md";
import axios from "axios";
import classNames from "classnames/bind";
import style from "./Menu.module.scss";
import DetailButtonFood from "../../components/DetailButtonFood";
const cx = classNames.bind(style);

function Menu() {
  const [detail, setDetail] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [dataMenu, setDataMenu] = useState([]);
  const [obj, setObj] = useState({});
  const client = axios.create({
    baseURL: "http://117.4.194.207:3003/dish/menu/best-seller",
  });

  useEffect(() => {
    client.get("?_limit=4").then((response) => {
      setDataMenu(response.data);
    });
  }, []);
  return (
    <Fragment>
      <section>
        <div className={cx("tiltle_container")}>
          <h3>Today's best deals</h3>
          <Link to={"/showall"}>SHOW ALL</Link>
        </div>
        <div className={cx("food_best_deal")}>
          {dataMenu.map((food) => (
            <div
              onClick={() => (
                //(food_id = food),
                setObj(food),
                //console.log(obj),
                setDetail(!detail),
                setOverlay(!overlay)
              )}
              key={food._id}
              className={cx("box_food_1")}
            >
              <img src={food.image_detail.path} alt="" />
              <div className={cx("about_food")}>
                <p>
                  {food.name} <br />
                  <span>{food.category}</span>
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
          className={cx("overlay")}
          onClick={() => (setDetail(false), setOverlay(false))}
        ></div>
      )}

      {detail && <DetailButtonFood obj={obj} />}

      {/* {showdetail && (
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
      )} */}
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
