import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import icon from "../../assets/image/icon.png";
import Headerhome from "../../components/DefaultLayout/Headerhome";
import classNames from "classnames/bind";
import style from "./home.scss";
const cx = classNames.bind(style);
function Home() {
  const { table } = useParams();
  const [isConfirm, setIsConfirm] = useState(false);
  function ProfilePage() {
    // Get the userId param from the URL.
    // let { table } = useParams();
    // ...
  }

  useEffect(() => {
    sessionStorage.setItem("table", table);
  }, [table]);

  const confirmHandler = () => {
    setIsConfirm(true);
  };
  const cancelHandler = () => {
    setIsConfirm(false);
  };


  const navigate = useNavigate();
  return (
    <Fragment>
      <Headerhome />
      {isConfirm && (
        <div className={cx("successContainer")} onClick={cancelHandler}>
          <div className="staffBox">
            <h2 className={cx("staffPopup")}>Bạn Muốn Gọi Hỗ Trợ?</h2>
            <div className="confirmButtonGroup">
              <button onClick={cancelHandler}>Huỷ</button>
              {/* chưa hoàn thiện */}
              <button onClick={cancelHandler}>Xác Nhận</button>
              {/* chưa hoàn thiện  */}
            </div>
          </div>
        </div>
      )}
      <div className={cx("homePage")}>
        <div className={cx("adsBanner")}></div>
        <p className={cx("yourTable")}>
          <span>Bạn đang ngồi bàn: {table}</span>
          <hr />
        </p>
        <button className="homeButton" onClick={confirmHandler}>
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
