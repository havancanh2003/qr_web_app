import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./ShowAll.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Fragment } from "react";
import leftArrow from "../../assets/image/left-arrow.png";

const cx = classNames.bind(style);

function ShowAll() {
  const [category, setCategory] = useState([]);
  const [listDish, setListDish] = useState([]);
  const navigate = useNavigate();
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 59)
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  })
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

  const handleClick = (name) => {
    const element = document.getElementById(name);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  if (category.length === 0 || listDish.length === 0) {
    return "loading...";
  }

  const callToActionBtns = document.querySelectorAll(".mobile__CTA--btn");
  callToActionBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      callToActionBtns.forEach(f => f.classList.remove('active'));
      e.target.classList.toggle("active");
    });
  });

  return (
    <Fragment>
      <div className={cx("topCart")}>
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
                className={cx(`mobile__CTA--btn ${0 === index ? "active" : ""}`)}>
                {cat.name}
              </button>
            </div>
          ))}
          <div className={cx("navBarElement")}>
            <span>thêm để không cần sửa</span>
          </div>
          {/* <div className={cx("navBarElement")}>
            <span>Tất Cả</span>
          </div> */}
        </div>
      </nav>
      <div className={cx("content")}>
        {category.map((cat, index) => (
          <div key={index}>
            <div className={cx("titleWrapper")}>
              <h2 id={cat.name}>{cat.name}</h2>
            </div>
            <div className={cx("showAllBody")}>
              {listDish
                .filter((dish) => dish.category === cat.name)
                .map((food, index) => (
                  <div className={cx("boxFoodWrapper")}>
                    <div key={index} className={cx("box_food_1")}>
                      <img src={food.image_detail.path} alt="" />
                    </div>
                    <div className={cx("foodDescription")}>
                      <h3>
                        {food.name} <br />
                      </h3>
                      <p>
                        {food.description}
                      </p>
                      <span className={cx("foodPrice")}>{food.price}đ</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default ShowAll;

