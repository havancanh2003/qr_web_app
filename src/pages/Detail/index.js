import classNames from "classnames/bind";
import style from "./Detail.module.scss";
import { Fragment } from "react";
import {
  FaRegClock,
  FaAcquisitionsIncorporated,
  FaAngleUp,
} from "react-icons/fa";
// import { BestDealFood } from "../../data/BestDealFood";
//import { menuSalad } from "../../data/BestDealFood";
const cx = classNames.bind(style);
function Detail() {
  return (
    <Fragment>
      <section>
        <div className={cx("img")}>
          <img
            src="https://www.allrecipes.com/thmb/wQCrv01gJqlIFM1AnCjODW3fZ0g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/14253-Taco-Salad-ddmfs-016-4x3-1-8c152400b3a2465fbaff684bdda0a264.jpg"
            alt=""
          />
        </div>
        <div className={cx("tile_food")}>
          <h3>
            Black Olive and <br /> Mint Salad
          </h3>
          <span>$14.25</span>
        </div>
        <div className={cx("about")}>
          <div className={cx("about_time")}>
            <FaRegClock />
            <span>30-40 ms + Delivery Time</span>
          </div>
          <div className={cx("about_food")}>
            <FaAcquisitionsIncorporated />
            <span>350g | Vegetables</span>
          </div>
          <span style={{ color: "red" }}>Chef: Emila Alise</span>
          <p style={{ margin: "10px 0 0 0" }}>
            The href attribute requires a valid value to be accessible. Provide
            a valid, navigable address as the href value. If you cannot provide
            a valid href, but still need the element to resemble a link
          </p>
        </div>
        <div className={cx("review")}>
          <h3>Reviews</h3>
          <div className={cx("view")}>
            <div className={cx("img_reviewer")}>
              <img
                src="https://media.bongda.com.vn/files/thanhdat.to/2017/10/24/865461394-1131.jpg"
                alt=""
              />
            </div>
            <div className={cx("p_reviewer")}>
              <p>
                The href attribute requires a valid value to be accessible.
                Provide a valid
              </p>
            </div>
          </div>
          <div className={cx("view")}>
            <div className={cx("img_reviewer")}>
              <img
                src="https://media.bongda.com.vn/files/thanhdat.to/2017/10/24/865461394-1131.jpg"
                alt=""
              />
            </div>
            <div className={cx("p_reviewer")}>
              <p>
                The href attribute requires a valid value to be accessible.
                Provide a valid
              </p>
            </div>
          </div>
          <div className={cx("view")}>
            <div className={cx("img_reviewer")}>
              <img
                src="https://media.bongda.com.vn/files/thanhdat.to/2017/10/24/865461394-1131.jpg"
                alt=""
              />
            </div>
            <div className={cx("p_reviewer")}>
              <p>
                The href attribute requires a valid value to be accessible.
                Provide a valid
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className={cx("footer")}>
        <FaAngleUp id={cx("push")} />
        <div>
          <button>Order Now</button>
          <button>Add to Cart</button>
        </div>
      </div>
    </Fragment>
  );
}

export default Detail;
