import { FaAlignLeft, FaAirFreshener } from "react-icons/fa";
import { MdOutlineFreeBreakfast, MdOutlineLunchDining } from "react-icons/md";
import { BestDealFood } from "../../data/BestDealFood";

import classNames from "classnames/bind";
import style from "./Menu.module.scss";
const cx = classNames.bind(style);

function Menu() {
  console.log(BestDealFood);
  return (
    <section>
      <div className={cx("header_container")}>
        <div className={cx("filter")}>
          <FaAlignLeft />
        </div>
        <div className={cx("search")}>
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className={cx("tiltle_container")}>
        <h3>Today's best deals</h3>
        <a href="#">SHOW ALL</a>
      </div>
      <div className={cx("food_best_deal")}>
        {BestDealFood.map((food, index) => (
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

        {/* <div className={cx("box_food_1")}>
          <img
            src="https://www.allrecipes.com/thmb/wQCrv01gJqlIFM1AnCjODW3fZ0g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/14253-Taco-Salad-ddmfs-016-4x3-1-8c152400b3a2465fbaff684bdda0a264.jpg"
            alt=""
          />
          <div className={cx("about_food")}>
            <p>
              Mint Salad <br />
              <span>30-45mn</span>
            </p>
            <span>13.00$$</span>
          </div>
        </div>  */}
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

      <div className={cx("combo")}>
        <div className={cx("combo_img")}>
          <img
            src="https://www.allrecipes.com/thmb/AYZbeG_jbkslFw0ZdVap62wD86Y=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7499125-baked-caesar-chicken-DDMFS-beauty-4x3-BG-9353-6aae9a89fac546a8b5f3ed38c3f44cb8.jpg"
            alt=""
          />
        </div>
        <div className={cx("combo_about")}>
          <h4>BreakFast</h4>
          <p>The href attribute requires a valid value to be accessible.</p>
          <span>23.00$$</span>
        </div>
      </div>
      <div className={cx("combo")}>
        <div className={cx("combo_img")}>
          <img
            src="https://www.allrecipes.com/thmb/AYZbeG_jbkslFw0ZdVap62wD86Y=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7499125-baked-caesar-chicken-DDMFS-beauty-4x3-BG-9353-6aae9a89fac546a8b5f3ed38c3f44cb8.jpg"
            alt=""
          />
        </div>
        <div className={cx("combo_about")}>
          <h4>Lunch</h4>
          <p>The href attribute requires a valid value to be accessible.</p>
          <span>23.00$$</span>
        </div>
      </div>
    </section>
  );
}

export default Menu;
