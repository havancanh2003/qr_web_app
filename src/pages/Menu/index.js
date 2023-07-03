
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";
import style from "./Menu.module.scss";
import AddOrder from "../../components/AddOrder/AddOrder";
import meowLoading from "../../assets/image/meo-loading.jpg";
import CartIcon from "../../components/CartIcon/index";
const cx = classNames.bind(style);

function Menu() {
  const [detail, setDetail] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [cartIcon, setCartIcon] = useState(true);
  const [listBestSeller, setLishBestSeller] = useState([]);
  const [categories, setCategories] = useState([]);
  const [listDish, setListDish] = useState([]);
  const [obj, setObj] = useState({});
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

  if (categories.length === 0 || listDish.length === 0) {
    <div className={cx("loadNote")}>
      <img src={meowLoading} alt="LOADING..."></img>
      <p>LOADING...</p>
    </div>
  }

  return (
    <Fragment>
      <section className={cx("MenuBody")}>
        <div className={cx("tiltle_container")}>
          <h3>Best seller:</h3>
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
              <div className={cx("imageBorder")}>
                <img src={food.image_detail.path} alt="" />
              </div>
              <div className={cx("about_food")}>
                <p>
                  {food.name}
                </p>
                <span>{food.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={cx("title_choose")}>
          <h3>Các thể loại:</h3>
        </div>
        <nav>
        <div className={cx("Category_chose")}>
          {categories.map((cate) => (
            <button
              //className="Category"
              key={cate._id}
              onClick={() => setType(cate)}
              className={cx({active: type === cate})}
            >
              {cate.name}
            </button>
          ))}
        </div>
        </nav>
        <div className={cx("categoryContent")}>
        {listDish
          .filter((dish) => dish.category === type.name)
          .map((food, index) => (
            <div
              key={index}
              onClick={() => (
                setObj(food), setDetail(!detail), setOverlay(!overlay)
              )}
              className={cx("boxFoodWrapper")}
            >
              <div className={cx("boxFoodImage")}>
                <img src={food.image_detail.path} alt="" />
              </div>
              <div className={cx("boxFoodAbout")}>
                <h4>{food.name}</h4>
                <p>{food.description}</p>
                <span>{food.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
              </div>
            </div>
          ))}
        </div>
       
      </section>
      {cartIcon && <CartIcon />}
      {overlay && (
        <div
          className={cx("overlay")}
          onClick={() => (setDetail(false), setOverlay(false))}
        ></div>
      )}
      {detail && <AddOrder obj={obj} listDish={listDish} />}
    </Fragment>
  );
}

export default Menu;
