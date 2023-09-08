import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { io } from "socket.io-client";
import icon from "../../assets/image/icon.png";
import classNames from "classnames/bind";
import style from "./home.scss";
import axios from "axios";
import IconBill from "../../components/IconBill";
import { tab } from "@testing-library/user-event/dist/tab";

const cx = classNames.bind(style);
function Home() {
  const { token } = useParams();
  const [isConfirm, setIsConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successActived, setSuccessActived] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isNeedHelp, setIsNeedHelp] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [table, setTable] = useState();
  const [cashierId, setCashierId] = useState();
  const [inputValue, setInputValue] = useState("");
  const [customerName, setCustomerName] = useState(
    // []
    JSON.parse(sessionStorage.getItem("name")) || []
  );
  const navigate = useNavigate();

  const group_id = sessionStorage.getItem("group_id") || 0;
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/table/token/${token}`)
      .then((response) => {
        console.log(response.data);
        sessionStorage.setItem("group_id", response.data.group_id);
        sessionStorage.setItem("table", response.data.name);
        sessionStorage.setItem("token", response.data.token);
        setIsActive(response.data.isActive);
        setTable(response.data.name);
        setCashierId(response.data.cashier_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);
    socket.on("activeTable", (response) => {
      if (response.isActive === true && response.name === table) {
        setSuccessActived(true);
        setIsActive(true);
      } else if (response.isActive === false && response.name === table) {
        setIsActive(false);
      }
    });
  }, [table]);

  const setName = () => {
    if (JSON.parse(sessionStorage.getItem("name"))) {
      setCustomerName(JSON.parse(sessionStorage.getItem("name")));
    }
  };

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
    if (isActive) {
      navigate("/showall");
    } else {
      setIsNeedHelp(true);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleConfirmClick = () => {
    if (inputValue.trim() === "") {
      setInputFocused(true);
      setTimeout(() => {
        setInputFocused(false);
        //remove class after
      }, 2000);
    } else {
      setInputFocused(false);

      if (inputValue.trim() !== "") {
        sessionStorage.setItem("name", JSON.stringify(inputValue));
      }
      setName();
    }
  };

  const submitHandler = () => {
    const data = {
      table: table,
      customer_name: customerName,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/call-staff/create/${group_id}`, data)
      .then((response) => {
        setIsSuccess(true);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSuccessActived = () => {
    setSuccessActived(false);
  };

  return (
    <Fragment>
      {customerName.length !== 0 && <IconBill></IconBill>}
      {customerName.length === 0 && (
        <Fragment>
          <div className={cx("getNameOverlay")} onClick={() => {}}></div>
          <div className={cx("getNameBox")}>
            <div className={cx("getNameTitle")}>QR MENU</div>
            <input
              type="text"
              placeholder="Nhập Tên Của Bạn:"
              value={inputValue}
              onChange={handleInputChange}
              className={cx("input", { "blink-animation": inputFocused })}
              required
            />
            <div className={cx("getNameNote")}>
              <span>* TÊN</span> sẽ giúp bạn kiểm tra đơn hàng cũng như sử dụng
              QR MENU
            </div>
            <button
              className={cx("getNameButton")}
              onClick={handleConfirmClick}
            >
              Xác Nhận
            </button>
          </div>
        </Fragment>
      )}
      {successActived && (
        <Fragment>
          <div className={cx("rtOverlay")} onClick={handleSuccessActived}></div>
          <div className={cx("rtBox")}>
            <div className={cx("rtNote")}>Bàn Của Bạn Đã Được Kích Hoạt</div>
            <button className={cx("rtButton")} onClick={handleSuccessActived}>
              Xác Nhận
            </button>
          </div>
        </Fragment>
      )}
      {isNeedHelp && (
        <div className={cx("successContainer")} onClick={cancelNeedHelpHandler}>
          <div className="needHelpBox">
            <h2 className={cx("needHelpPopup")}>
              Bàn Chưa Được Kích Hoạt <br /> Vui Lòng Gọi Nhân Viên
            </h2>
            <div className="confirmButtonGroup homeGroup">
              <button className="cancelButton" onClick={cancelNeedHelpHandler}>
                Huỷ
              </button>

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
              <button className="cancelButton" onClick={cancelHandler}>
                Huỷ
              </button>

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
              <button className="cancelButton" onClick={cancelSuccesHandler}>
                Huỷ
              </button>
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
          {customerName.length !== 0 && (
            <Fragment>
              <span>Chào Mừng {customerName}</span>
            </Fragment>
          )}
          <span id="coverBottom">Bạn đang ngồi bàn: {table}</span>
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
