//import { FaAirFreshener } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
//import { MdOutlineFreeBreakfast, MdOutlineLunchDining } from "react-icons/md";
import axios from "axios";
import classNames from "classnames/bind";
import style from "./Menu.module.scss";
import DetailButtonFood from "../../components/DetailButtonFood";
import AddOrder from "../../components/AddOrder/AddOrder";
const cx = classNames.bind(style);

function Menu() {
  const [detail, setDetail] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [listBestSeller, setLishBestSeller] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [cate, setCate] = useState([]);
  const [obj, setObj] = useState({});
  const [listDish, setListDish] = useState([]);
  const [type, setType] = useState();

  useEffect(() => {
    axios
      .get("http://117.4.194.207:3003/dish/menu/best-seller")
      .then((response) => {
        setLishBestSeller(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get("http://117.4.194.207:3003/dish/menu/all-actived")
      .then((response) => {
        setListDish(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://117.4.194.207:3003/category/all")
      .then((response) => {
        const data = response.data;
        setCategories(data);
        setType(data[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  // if (categories.length === 0 || listDish.length === 0) {
  //   return <p>LOADING...</p>;
  // }

  return (
    <Fragment>
      <section>
        <div className={cx("tiltle_container")}>
          <h3>Today's best deals</h3>
          <Link to={"/showall"}>Xem thêm</Link>
        </div>
        <div className={cx("food_best_deal")}>
          {listBestSeller.map((food) => (
            <div
              key={food._id}
              onClick={() => (
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

        <div className={cx("title_choose")}>
          <h3>Các thể loại:</h3>
        </div>
        <div className={cx("Category_chose")}>
          {categories.map((cate) => (
            <button
              //className="Category"
              key={cate._id}
              onClick={() => setType(cate)}
              style={
                type === cate
                  ? {
                      color: "#fff",
                      backgroundColor: "#333",
                    }
                  : {}
              }
            >
              {cate.name}
            </button>
          ))}
        </div>
        {listDish
          .filter((dish) => dish.category === type.name)
          .map((food, index) => (
            <div
              key={index}
              onClick={() => (
                setObj(food), setDetail(!detail), setOverlay(!overlay)
              )}
              className={cx("combo")}
            >
              <div className={cx("combo_img")}>
                <img src={food.image_detail.path} alt="" />
              </div>
              <div className={cx("combo_about")}>
                <h4>{food.name}</h4>
                <p>{food.description}</p>
                <span>{food.price}</span>
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
      {/* {detail && <AddOrder obj={obj} />} */}
      {detail && <AddOrder obj={obj} listDish={listDish} />}
    </Fragment>
  );
}

export default Menu;
