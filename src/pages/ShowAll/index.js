import React from "react";
import classNames from "classnames/bind";
import style from "./ShowAll.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { BestDealFood } from "../../data/BestDealFood";
import { menuSalad } from "../../data/BestDealFood";
const cx = classNames.bind(style);
function ShowAll() {
  const [category, setCategory] = useState([]);
  const [listDish, setListDish] = useState([]);
  useEffect(() => {
    axios
      .get("http://117.4.194.207:3003/category/all")
      .then((response) => {
        console.log(response);
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://117.4.194.207:3003/dish/menu/all-actived")
      .then((response) => {
        console.log(response);
        setListDish(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const categoryHandler = (categoryName) => {
  //   axios
  //     .get(`http://117.4.194.207:3003/dish/category/${categoryName}`)
  //     .then((response) => {
  //       console.log(response);
  //       setListDish(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  console.log(category);
  console.log(listDish);
  return (
    <section>
      <div className={cx("navBar")}>
        <div className={cx("navBarBox")}>
          <div className={cx("navBarElement")}>
            <p>Tất Cả</p>
          </div>
          {category.map((food, index) => (
            <div key={index} className={cx("navBarElement")}>
              <p>{food.name}</p>
            </div>
          ))}
          {/* decoy */}
          <div className={cx("navBarElement")}>
            <p>Tất Cả</p>
          </div><div className={cx("navBarElement")}>
            <p>Tất Cả</p>
          </div><div className={cx("navBarElement")}>
            <p>Tất Cả</p>
          </div><div className={cx("navBarElement")}>
            <p>Tất Cả</p>
          </div>
          {/* decoy */}
        </div>
      </div>
      {/* 2 selection box */}

      {/* <div className={cx("filter")}>
        <select name="lang" id="lang-select">
          <option selected disabled>
            Price
          </option>
          <option value="1">13.00$$</option>
          <option value="2">13.00$$</option>
          <option value="3">13.00$$</option>
        </select>

        <select name="lang" id="lang-select">
          <option selected disabled>
            Time
          </option>
          <option value="4">13.00$$</option>
          <option value="5">13.00$$</option>
          <option value="6">13.00$$</option>
        </select>
      </div> */}
      {category.map((category, index) => (
        <div key={index}>
          <h2>{category.name}</h2>
          <div className={cx("showAllBody")}>
            {listDish
              .filter((dish) => dish.category === category.name)
              .map((food, index) => (
                <div key={index} className={cx("box_food_1")}>
                  <img src={food.image_detail.path} alt="" />
                  <div className={cx("foodDescription")}>
                    <p>
                      {food.name} <br />
                      {/* <span>{food.description}</span> */}
                    </p>
                    <span className={cx("foodPrice")}>{food.price}đ</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      
      {/* <section className={cx("recommend")}>
        <h2>You might also like</h2>
        <div className={cx("food_recommend")}>
          <div className={cx("food_1")}>
            <div className={cx("food_img")}>
              <img
                src="https://www.allrecipes.com/thmb/AYZbeG_jbkslFw0ZdVap62wD86Y=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7499125-baked-caesar-chicken-DDMFS-beauty-4x3-BG-9353-6aae9a89fac546a8b5f3ed38c3f44cb8.jpg"
                alt=""
              />
            </div>
            <div className={cx("about")}>
              <p>16.00$$</p>
              <h4>Feta Salad</h4>
              <span>20-40ms</span>
            </div>
          </div>
          <div className={cx("food_1")}>
            <div className={cx("food_img")}>
              <img
                src="https://www.allrecipes.com/thmb/AYZbeG_jbkslFw0ZdVap62wD86Y=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7499125-baked-caesar-chicken-DDMFS-beauty-4x3-BG-9353-6aae9a89fac546a8b5f3ed38c3f44cb8.jpg"
                alt=""
              />
            </div>
            <div className={cx("about")}>
              <p>16.00$$</p>
              <h4>Feta Salad</h4>
              <span>20-40ms</span>
            </div>
          </div>
        </div>
      </section> */}
    </section>
  );
};

export default ShowAll;
