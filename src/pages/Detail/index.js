import classNames from "classnames/bind";
import style from "./Detail.module.scss";
import { Fragment, useState } from "react";
import { FaRegClock, FaAcquisitionsIncorporated } from "react-icons/fa";

const cx = classNames.bind(style);
function Detail() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(true);
  const [add, setAdd] = useState(false);

  function a() {
    setOpen(!open);
    setName(!name);
  }

  return (
    <Fragment>
      <section
        onClick={() => {
          setOpen(false);
          setName(true);
          setAdd(false);
        }}
      >
        <div className={cx("img")}>
          <img
            src="https://www.allrecipes.com/thmb/wQCrv01gJqlIFM1AnCjODW3fZ0g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/14253-Taco-Salad-ddmfs-016-4x3-1-8c152400b3a2465fbaff684bdda0a264.jpg"
            alt=""
          />
          <img
            src="https://www.allrecipes.com/thmb/wQCrv01gJqlIFM1AnCjODW3fZ0g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/14253-Taco-Salad-ddmfs-016-4x3-1-8c152400b3a2465fbaff684bdda0a264.jpg"
            alt=""
          />
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
          <h3>You Most Like It</h3>
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

          {/* <div className={cx("view")}>
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
          </div> */}
        </div>
      </section>
      {/* <div className={cx("show")}>
        <div className={cx("a")}></div>
      </div> */}
      {/* <div className={cx("footer")}>
        {open && (
          <div className={cx("show")}>
            <div className={cx("box_note")}>
              <div className={cx("container_note")}>
                <label>Lemon</label>
                <input type="checkbox" name="check" />
              </div>
              <div className={cx("container_note")}>
                <label>Olive</label>
                <input type="checkbox" name="check" />
              </div>
              <div className={cx("container_note")}>
                <label>Mint</label>
                <input type="checkbox" name="check" />
              </div>
            </div>
            <div className={cx("note")}>
              <textarea placeholder="Note..."></textarea>
            </div>
          </div>
        )}
        <div
          style={{
            cursor: "pointer",
          }}
          id={cx("push")}
          onClick={a}
        >
          <ion-icon
            name={name ? "arrow-up-outline" : "arrow-down-outline"}
          ></ion-icon>
        </div>
        {add && (
          <div className={cx("showa")}>
            <ion-icon
              className={cx("icon")}
              onClick={() => (setAdd(false), setOpen(false), setName(true))}
              name="close-outline"
            ></ion-icon>
            <div className={cx("done")}>
              <ion-icon name="checkmark-outline"></ion-icon>
            </div>
          </div>
        )}
        <div>
          <button>Order Now</button>
          <button onClick={() => setAdd(true)}>Add to Cart</button>
        </div>
      </div> */}
    </Fragment>
  );
}

export default Detail;
