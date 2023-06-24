import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Fragment, useEffect } from "react";
import icon from "../../assets/image/icon.png";
import Headerhome from "../../components/DefaultLayout/Headerhome";
import classNames from "classnames/bind";
import style from "./home.scss";
const cx = classNames.bind(style);
function Home() {
  const { table } = useParams();
  function ProfilePage() {
    // Get the userId param from the URL.
    // let { table } = useParams();
    // ...
  }

  useEffect(() => {
    sessionStorage.setItem("table", table);
  }, [table]);

  const navigate = useNavigate();
  return (
    <Fragment>
      <Headerhome />
      <div className={cx("homePage")}>
        <div className={cx("adsBanner")}></div>
        <p className={cx("yourTable")}>
          <span>Bạn đang ngồi bàn: {table}</span>
          <hr />
        </p>
        <button className="homeButton">
          <img src={icon} alt="icon"></img>
          <span>Gọi Nhân Viên</span>
        </button>
        <button
          className="homeButton"
          id="secondButton"
          onClick={() => navigate('/menu')}
        >
          Xem Menu - Gọi Món
        </button>
        <p id="introduce">Powed by 4Flex</p>
      </div>
    </Fragment>
  );
}

export default Home;
