import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./BillHistory.scss";
import axios from "axios";
import classNames from "classnames/bind";
// import MoreIcon from "../../assets/image/moreIcon.png";
import leftArrow from "../../assets/image/left-arrow.png";
import moment from "moment";
import "moment/locale/vi";

const cx = classNames.bind(style);

function BillHistory() {
  const navigate = useNavigate();
  const [listBill, setListBill] = useState([]);
  const customerName = JSON.parse(sessionStorage.getItem("name")) || [];
  const table = JSON.parse(sessionStorage.getItem("table")) || [];
  const [viewBill, setViewBill] = useState(true);
  const [viewRequests, setViewRequests] = useState(false);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          `http://117.4.194.207:3003/cart/history/all?table=${table}&customer_name=${customerName}`
        )
        .then((response) => {
          if (response.data === "No matching carts found") {
            setListBill([]);
          } else {
            setListBill(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleClickViewBill = () => {
    setViewBill(true)
    setViewRequests(false)
  }
  const handleClickViewRequests = () => {
    setViewBill(false)
    setViewRequests(true)
  }

  return (
    <Fragment>
      <div className={cx("backArrow")} onClick={() => navigate("/menu")} >
          <img src={leftArrow} alt="Back"></img>
      </div>

      < nav id="billNav">
        <div className={cx("navBox")}>
          <div className={cx("navElement")}>
            <button
              // id={"-btn"}
              onClick={() => handleClickViewBill()}
              className={cx("billButton", { picked: viewBill === true })}
            >
              Hoá Đơn
            </button>
          </div>
          <div className={cx("navElement")}>
            <button
              // id={"-btn"}
              onClick={() => handleClickViewRequests()}
              className={cx("requestButton", {picked: viewRequests === true })}
            >
              Yêu Cầu
            </button>
          </div>
        </div>
      </nav >
      {(viewBill && (listBill.length === 0)) &&
        <Fragment>
          <div className={cx("billEmptyNote")}>Không Có Hoá Đơn Nào</div>
        </Fragment>
      }

      {(viewBill && (listBill.length !== 0)) &&
        <Fragment>
          {listBill.map((bill, index) => (
            <div className={cx("bhContent")} key={index}>
              <div className={cx("bhContainer3")}>
                <div className={cx("container3Title")}>
                  <div className={cx("container3Name")}>Tên Món</div>
                  <div className={cx("container3Quantity")}>Số Lượng</div>
                </div>
                {bill.order.map((item, itemIndex) => (
                  <div className={cx("container3Content")} key={itemIndex}>
                    <div className={cx("container3Name")}>{item.dish_name}</div>
                    <div className={cx("container3Quantity")}>{item.number}</div>
                  </div>
                ))}
                
              </div>
              <div className={cx("bhContainer1")}>
                <div className={cx("bhName")}>Tên:{" " + customerName}</div>
                <div className={cx("bhTime")}>
                  Thời gian:
                  {" " +
                    moment(bill.createAt, "DD/MM/YYYY, HH:mm:ss").format(
                      "HH:mm A"
                    )}
                </div>
                <div>Đã Gửi</div>
              </div>
              <div className={cx("bhContainer2")}>
                <div className={cx("bhTotalItem")}>Bàn: {bill.table}</div>
                <div className={cx("bhTotalBill")}>
                  Tổng tiền:
                  <br />
                  <span>{bill.total.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>
            </div>
          ))}
        </Fragment>
      }

      {(viewRequests && (requests.length === 0)) &&
        <Fragment>
          <div className={cx("billEmptyNote")}>Không Có Yêu Cầu Nào</div>
        </Fragment>
      }

    </Fragment>
  )

}

export default BillHistory;
