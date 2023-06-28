import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import style from "./ShowAll.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Fragment } from "react";
import leftArrow from "../../assets/image/left-arrow.png";

const cx = classNames.bind(style);

function ShowAll() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [listDish, setListDish] = useState([]);
  const [sticky, setSticky] = useState(false);
  const activeSectionRef = useRef(null);

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
    const handleScroll = () => {
      setSticky(window.scrollY > 59);
      const currentPosition =
        document.documentElement.scrollTop + 300;

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

  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (name) => {
    const element = document.getElementById(name);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (category.length === 0 || listDish.length === 0) {
    return <div>Loading...</div>;
  }


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
                className={cx("CTA", { active: activeButton === cat.name })}
              >
                {cat.name}
              </button>
            </div>
          ))}
          <div className={cx("navBarElement")}>
            <span>Thêm để không cần sửa</span>
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
                    onClick={() => {console.log("bbbb")}}>
                    <div className={cx("box_food_1")}>
                      <img src={food.image_detail.path} alt="" />
                    </div>
                    <div className={cx("foodDescription")}>
                      <h3>{food.name}</h3>
                      <p>{food.description}</p>
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