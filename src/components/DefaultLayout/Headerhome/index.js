import React from "react";
import style from "./Headerhome.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
const Headerhome = () => {
  return (
    <header className={cx("headerhome")}>
      {/* <Sidebar className={cx("sidebar")} /> */}
      {/* <FaChevronLeft className={cx("cart")} onClick={click} /> */}
      <img
        src="https://static.vecteezy.com/system/resources/previews/014/971/638/non_2x/food-logo-design-template-restaurant-free-png.png"
        alt=""
      />
      {/* <FaBoxTissue className={cx("cart")} /> */}
    </header>
  );
};

export default Headerhome;
