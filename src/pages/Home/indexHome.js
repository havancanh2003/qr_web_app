import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { io } from "socket.io-client";
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
  const [successActived, setSuccessActived] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isNeedHelp, setIsNeedHelp] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);
    socket.on('activeTable', (response) => {
      const tableCheck = response;  
      console.log(tableCheck);
      if (tableCheck.isActive === true && tableCheck.name === table) {
        console.log("hien thi thong bao");
        setSuccessActived(true)
        setIsActive(true)
      }else if(tableCheck.isActive === false && tableCheck.name === table){
        setIsActive(false)
      }
    });
  }, []);

  useEffect(() => {
    axios
    .get(`http://117.4.194.207:3003/table/detail/${table}`)
    .then((response) => {
      if(response.data.isActive === true){
        setIsActive(true)
        // setIsActive(false)
      }else{
        setIsActive(false)
        // setIsActive(true)
      }
    })
    .catch((error) => {
      console.log(error);
    });
    sessionStorage.setItem("table", table);
  }, [table]);
  

  const confirmHandler = () => {
    setIsConfirm(true);
  };
  const cancelHandler = () => {
    setIsConfirm(false);
  };
  const cancelSuccesHandler = () => {
    setIsSuccess(false);
  };
  const cancelNeedHelpHandler = () => {
    setIsNeedHelp(false);
  };
  const checkActiveHandler = () => {
    if(isActive){
      navigate("/menu")
    }else{
      setIsNeedHelp(true)
    }
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
  
  const handleSuccessActived = () => {
    setSuccessActived(false)
  }

  return (
    <Fragment>
      <Headerhome />
      {successActived &&
        <Fragment>
          <div className={cx("rtOverlay")} onClick={handleSuccessActived}>
          </div>
          <div className={cx("rtBox")}>
            <div className={cx("rtNote")} >Bàn Của Bạn Đã Được Kích Hoạt</div>
            <button className={cx("rtButton")} onClick={handleSuccessActived}>Xác Nhận</button>
          </div>
        </Fragment>
      }
      {isNeedHelp && (
        <div className={cx("successContainer")} onClick={cancelNeedHelpHandler}>
        <div className="needHelpBox">

          <h2 className={cx("needHelpPopup")}>Bàn Chưa Được Kích Hoạt <br /> Vui Lòng Gọi Nhân Viên</h2>
          <div className="confirmButtonGroup homeGroup">
            <button className="cancelButton" onClick={cancelNeedHelpHandler}>Huỷ</button>

            {/* chưa hoàn thiện */}
            <button onClick={cancelNeedHelpHandler}>Xác Nhận</button>
            {/* chưa hoàn thiện  */}
          </div>
        </div>
      </div>
      )}
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
        <div className={cx("successContainer")} onClick={cancelSuccesHandler}>
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
          onClick={checkActiveHandler}
        >
          Xem Menu - Gọi Món
        </button>
        <p id="introduce">Powed by 4Flex</p>
      </div>
    </Fragment>
  );
}

export default Home;
