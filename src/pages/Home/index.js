import * as React from "react";

import { Routes, Route, useParams, useNavigate, Link } from "react-router-dom";
import { Fragment } from "react";

import "./home.scss";
import icon from "../../assets/image/icon.png";
import Headerhome from "../../components/DefaultLayout/Headerhome";
import classNames from "classnames/bind";
import style from "./home.scss";
const cx = classNames.bind(style);
function Home() {
  function ProfilePage() {
    // Get the userId param from the URL.
    let { userId } = useParams();
    // ...
  }
  const navigate = useNavigate()
  return (
    <Fragment>
      <Headerhome />
      <div className={cx("homePage")}>
        <div className={cx("adsBanner")}></div>
        <p className={cx("yourTable")}>
          <span>Bạn đang ngồi bàn:</span>
          <hr />
        </p>


      <button className="homeButton">
        <img src={icon} alt="icon"></img>
        <span>Gọi Nhân Viên</span>
      </button>
      <button 
        className="homeButton" 
        id="secondButton"
        onClick={() => navigate('Menu')}
        >
        Xem Menu - Gọi Món
      </button>
      <p id="introduce">Powed by 4Flex</p>
    </div>
    </Fragment>

  );
}

export default Home;
