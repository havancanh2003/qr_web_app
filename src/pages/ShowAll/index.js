import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import style from "./ShowAll.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Fragment } from "react";
import leftArrow from "../../assets/image/left-arrow.png";
import AddOrder from "../../components/AddOrder/AddOrder";
import CartIcon from "../../components/CartIcon/index";
import meowLoading from "../../assets/image/meo-loading.jpg";
const cx = classNames.bind(style);

function ShowAll() {
  const navigate = useNavigate();
  const activeSectionRef = useRef(null);
  const [sticky, setSticky] = useState(false);
  const [detail, setDetail] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [cartIcon, setCartIcon] = useState(true);
  const [category, setCategory] = useState([]);
  const [listDish, setListDish] = useState([]);
  const [dishClass, setDishClass] = useState([]);
  const [hideDish, setHideDish] = useState([]);
  const [obj, setObj] = useState({});
  const [activeButton, setActiveButton] = useState(null);


  const [tester, setTester] = useState(false);

  useEffect(() => {
    axios
      .get("http://117.4.194.207:3003/category/all")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://117.4.194.207:3003/dish/menu/all-actived")
      .then((response) => {
        setListDish(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setHideDish([]);

    const hideDishAmounts = category.map((cat) =>
      listDish
        .filter((dish) => dish.category === cat.name)
        .map((food) => food.amount)
    );

    setHideDish(hideDishAmounts.flat());
    // console.log(hideDish);
  }, [listDish]);

  useEffect(() => {
    setDishClass([]);
    hideDish.forEach((item) => {
      if (item === 0) {
        setDishClass((currentDishClass) => [...currentDishClass, "boxFoodWrapperZero"]);
      } else {
        setDishClass((currentDishClass) => [...currentDishClass, "boxFoodWrapper"]);
      }
    });

    const changeClass = () => {
      const boxFoodWrapperElements = document.getElementsByClassName("boxFoodWrapper");
      for (let i = 0; i < boxFoodWrapperElements.length; i++) {
        boxFoodWrapperElements[i].classList.add(dishClass[i]);
      }
    };

    if (dishClass.length > 0) {
      setTimeout(changeClass, 0);
    }

  }, [hideDish]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setDetail(false);
        setOverlay(false);
        setCartIcon(true);
      }
      setSticky(window.scrollY > 59);

      const currentPosition = document.documentElement.scrollTop + 300;

      for (let i = 0; i < category.length; i++) {
        const cat = category[i];
        const section = document.getElementById(cat.name);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            currentPosition >= sectionTop &&
            currentPosition < sectionTop + sectionHeight - 100
          ) {
            if (activeSectionRef.current !== cat.name) {
              activeSectionRef.current = cat.name;
              setActiveButton(cat.name);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [category]);

  const handleClick = (name) => {
    const element = document.getElementById(name);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClickTest = () => {
    setTester(!tester);
  };

  if (tester) {

  }

  if (category.length === 0 || listDish.length === 0) {
    return (
      <div>
        <div className={cx("topShowAll")}>
          <button className={cx("backButton")} onClick={() => navigate("/showall")}>
            <img src={leftArrow} alt="icon" />
          </button>
          <p className={cx("topTitle")}>SHOW ALL</p>
        </div>
        <div className={cx("loadNote")}>
          <img src={meowLoading} alt="LOADING..."></img>
          <p>LOADING...</p>
        </div>;
      </div>
    )
  }

  return (
    <Fragment>
      {cartIcon && <CartIcon />}
      <div className={cx("topShowAll")}>
        <button className={cx("backButton")} onClick={() => navigate("/menu")}>
          <img src={leftArrow} alt="icon" />
        </button>
        <p className={cx("topTitle")}>SHOW ALL</p>
      </div>

      <nav className={`${sticky ? "sticky" : ""}`}>
        <div className={cx("navBarBox")}>
          {category.map((cat, index) => (
            <div key={index} className={cx("navBarElement")}>
              <button
                id={cat.name + "-btn"}
                onClick={() => handleClick(cat.name)}
                className={cx("CTA", { active: activeButton === cat.name })}
              >
                {cat.name}
              </button>
            </div>
          ))}
          <div className={cx("navBarElement")}>
            {/* <span>Thêm để không cần sửa</span> */}
            {/* <span>ws</span> */}
          </div>
        </div>
      </nav>

      <div className={cx("content")}>
        {category.map((cat, index) => (
          <div key={index} id={cat.name} className={cx("targetScroll")}>
            <div className={cx("titleWrapper")}>
              <h2>{cat.name}</h2>
            </div>
            <div className={cx("showAllBody")}>
              {listDish
                .filter((dish) => dish.category === cat.name)
                .map((food, index) => (
                  <div
                    key={index}
                    className={cx("boxFoodWrapper")}
                    onClick={() => (
                      setObj(food), setDetail(!detail), setOverlay(!overlay), setCartIcon(false)
                    )
                    }>
                    <div className={cx("box_food_1")}>
                      <img src={food.image_detail.path} alt="" />
                    </div>
                    <div className={cx("foodDescription")}>
                      <h3>{food.name}</h3>
                      <p>{food.description}</p>
                      <span className={cx("ZeroAmount")}>Hết Món</span>
                      <span className={cx("foodPrice")}>{food.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>

                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      {overlay && (
        <div
          className={cx("overlay")}
          onClick={() => (setDetail(false), setOverlay(false), setCartIcon(true))}
        ></div>
      )}
      {detail && <AddOrder obj={obj} listDish={listDish} />}
    </Fragment>
  );
}

export default ShowAll;