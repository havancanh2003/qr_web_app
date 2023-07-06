import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import icon from "../../assets/image/icon.png";
import Headerhome from "../../components/DefaultLayout/Headerhome";
import classNames from "classnames/bind";
import style from "./home.scss";
import axios from "axios";

const cx = classNames.bind(style);
function Home() {
  const { table } = useParams();
  const [isConfirm, setIsConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  function ProfilePage() {
    // Get the userId param from the URL.
    // let { table } = useParams();
    // ...
  }

  useEffect(() => {
    sessionStorage.setItem("table", table);
  }, [table]);
  console.log({ table: table });
  const confirmHandler = () => {
    setIsConfirm(true);
  };
  const cancelHandler = () => {
    setIsConfirm(false);
  };
  const cancelSuccesHandler = () => {
    setIsSuccess(false);
  };

  const submitHandler = () => {
    axios
      .post("http://117.4.194.207:3003/call-staff/create", { table: table })
      .then((response) => {
        setIsSuccess(true);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = useNavigate();
  return (
    <Fragment>
      <Headerhome />
      {isConfirm && (
        <div className={cx("successContainer")} onClick={cancelHandler}>
          <div className="staffBox">

            <h2 className={cx("staffPopup")}>Bạn Muốn Gọi Hỗ Trợ?</h2>
            <div className="confirmButtonGroup homeGroup">
              <button className="cancelButton" onClick={cancelHandler}>Huỷ</button>

              {/* chưa hoàn thiện */}
              <button onClick={submitHandler}>Xác Nhận</button>
              {/* chưa hoàn thiện  */}
            </div>
          </div>
        </div>
      )}
      {isSuccess && (
        <div className={cx("successContainer")} onClick={cancelHandler}>
          <div className="staffBox">
            <h2 className={cx("staffPopup")}>Gửi yêu cầu thành công</h2>
            <div className="confirmButtonGroup">
              <button
                className="cancelButton"
                onClick={cancelSuccesHandler}>Huỷ</button>
              {/* chưa hoàn thiện */}
              <button onClick={cancelSuccesHandler}>Xác Nhận</button>
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
          onClick={() => navigate("/menu")}
        >
          Xem Menu - Gọi Món
        </button>
        <p id="introduce">Powed by 4Flex</p>
      </div>
    </Fragment>
  );
}

export default Home;
