import React from "react";
import classNames from "classnames/bind";
import style from "./ShowSearchFood.module.scss";
// import { BestDealFood } from "../../data/BestDealFood";
import { menuSalad } from "../../data/BestDealFood";
const cx = classNames.bind(style);
const ShowSearchFood = () => {
  return (
    <section>
      <div className={cx("filter")}>
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
      </div>

      <div className={cx("food_best_deal")}>
        {menuSalad.map((food, index) => (
          <div key={index} className={cx("box_food_1")}>
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

      <section className={cx("recommend")}>
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
      </section>
    </section>
  );
};

export default ShowSearchFood;
