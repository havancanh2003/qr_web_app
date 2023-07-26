import React from "react";
import style from "./Headerhome.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
const Headerhome = () => {
  return (
    <header className={cx("headerhome")}>
      <img
        src="https://static.vecteezy.com/system/resources/previews/014/971/638/non_2x/food-logo-design-template-restaurant-free-png.png"
        alt="Logo"
      />
    </header>
  );
};

export default Headerhome;
