import * as React from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";

import "./home.scss";
import icon from "../../assets/image/icon.png";
import logo192 from "../../assets/image/logo192.png";

import classNames from "classnames/bind";
import style from "./home.scss";
const cx = classNames.bind(style);
function Home() {
  return (
    <div className={cx("homePage")}>
      <div className={cx("topBar")}>
        <img src={logo192} alt="LOGO"></img>
      </div>
      <div className={cx("adsBanner")}></div>
      <p className={cx("yourTable")}>
        <span>Bạn đang ngồi bàn:</span>
      </p>
      <hr />
      <button className="homeButton">
        <img src={icon} alt="icon"></img>
        <span>Gọi Nhân Viên</span>
      </button>
      <button className="homeButton" id="secondButton">
        Xem Menu - Gọi Món
      </button>
      <p id="introduce">Powed by 4Flex</p>
    </div>
  );
}

export default Home;
