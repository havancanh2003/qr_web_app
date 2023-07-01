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
  const [type, setType] = useState("Cơm");
  const [overlay, setOverlay] = useState(false);
  const [dataMenu, setDataMenu] = useState([]);
  const [category, setCategory] = useState([]);
  const [obj, setObj] = useState({});
  const categorys = ["Cơm", "Đồ ăn nhanh", "Nước"];
  const client = axios.create({
    baseURL: "http://117.4.194.207:3003/dish/menu/best-seller",
  });

  useEffect(() => {
    client
      .get("?_limit=4")
      .then((response) => {
        setDataMenu(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get(`http://117.4.194.207:3003/dish/category/${type}`)
      .then((response) => {
        //console.log(response.data);
        setCategory(response.data);
      })
      .catch((error) => console.log(error));
  }, [type]);
  //console.log(obj);
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
              key={food._id}
              onClick={() => (
                // console.log(food),
                setObj(food), setDetail(!detail), setOverlay(!overlay)
              )}
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
        {/* <div className={cx("recomment_categorys")}>
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
        </div> */}
        <div className={cx("Category_chose")}>
          {categorys.map((category) => (
            <button
              //className="Category"
              key={category}
              onClick={() => setType(category)}
              style={
                type === category
                  ? {
                      color: "#fff",
                      backgroundColor: "#333",
                    }
                  : {}
              }
            >
              {category}
            </button>
          ))}
        </div>
        {category.map((combo) => (
          <div
            key={combo.id}
            onClick={() => (
              console.log(combo),
              setObj(combo),
              setDetail(!detail),
              setOverlay(!overlay)
            )}
            className={cx("combo")}
          >
            <div className={cx("combo_img")}>
              <img src={combo.image_detail.path} alt="" />
            </div>
            <div className={cx("combo_about")}>
              <h4>{combo.name}</h4>
              <p>{combo.description}</p>
              <span>{combo.createAt}</span>
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
    </Fragment>
  );
}

export default Menu;
// const combos = [
//   {
//     id: "cb1",
//     src_img:
//       "https://www.allrecipes.com/thmb/AYZbeG_jbkslFw0ZdVap62wD86Y=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7499125-baked-caesar-chicken-DDMFS-beauty-4x3-BG-9353-6aae9a89fac546a8b5f3ed38c3f44cb8.jpg",
//     tile: "Lunch",
//     about: "The href attribute requires a valid value to be accessible.",
//     price: "199.000",
//   },
//   {
//     id: "cb2",
//     src_img:
//       "https://www.allrecipes.com/thmb/AYZbeG_jbkslFw0ZdVap62wD86Y=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7499125-baked-caesar-chicken-DDMFS-beauty-4x3-BG-9353-6aae9a89fac546a8b5f3ed38c3f44cb8.jpg",
//     tile: "Breakfast",
//     about: "The href attribute requires a valid value to be accessible.",
//     price: "199.000",
//   },
// ];
