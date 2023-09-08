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
  const [listCallStaff, setListCallStaff] = useState([]);
  const customerName = JSON.parse(sessionStorage.getItem("name")) || [];
  const [viewBill, setViewBill] = useState(true);
  const [viewRequests, setViewRequests] = useState(false);
  const [requests, setRequests] = useState([]);

  const table = JSON.parse(sessionStorage.getItem("table")) || [];
  const group_id = sessionStorage.getItem("group_id") || 0;

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/cart/history/all/${group_id}?table=${table}&customer_name=${customerName}`
        )
        .then((response) => {
          if (response.data !== "No carts created" && response.data !== "No matching carts found") {
            setListBill(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/call-staff/customer/${group_id}?table=${table}&customer_name=${customerName}`
        )
        .then((response) => {
          if (response.data !== "No call staff created" && response.data !== "No matching call staff found") {
            setListCallStaff(response.data);
            // console.log(response.data);
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
    setViewBill(true);
    setViewRequests(false);
  };
  const handleClickViewRequests = () => {
    setViewBill(false);
    setViewRequests(true);
  };

  return (
    <Fragment>
      <div className={cx("backArrow")} onClick={() => navigate("/showall")}>
        <img src={leftArrow} alt="Back"></img>
      </div>

      <nav id="billNav">
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
              className={cx("requestButton", { picked: viewRequests === true })}
            >
              Yêu Cầu Đã Gửi
            </button>
          </div>
        </div>
      </nav>
      {viewBill && listBill.length === 0 && (
        <Fragment>
          <div className={cx("billEmptyNote")}>Chưa Có Hoá Đơn Nào</div>
        </Fragment>
      )}

      {(viewBill && listBill.length !== 0) && (
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
                    <div className={cx("container3Quantity")}>
                      {item.number}
                    </div>
                    <div className={cx("container3TotalPrice1")}>
                      Thành Tiền:{" "}
                    </div>
                    <div className={cx("container3TotalPrice2")}>
                      {(item.dish_price * item.number).toLocaleString("vi-VN")}đ
                    </div>
                  </div>
                ))}
                {bill.note !== "" && (
                  <div className={cx("container3Note")}>
                    Ghi Chú: <span>{bill.note}</span>
                  </div>
                )}
                {bill.note === "" && (
                  <div className={cx("container3Note")}>Không Có Ghi Chú</div>
                )}
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
                <div className={cx("bhTotalItem")}>Bàn: {bill.table}</div>
                {/* <div>Đã Gửi</div> */}
              </div>
              <div className={cx("bhContainer2")}>
                {/* <div className={cx("bhTotalItem")}>Bàn: {bill.table}</div> */}
                <div className={cx("bhTotalBill")}>
                  Tổng tiền:
                  <span>{" " + bill.total.toLocaleString("vi-VN")}đ</span>
                </div>
                {bill.status === "IN_PROGRESS" && (
                  <Fragment>
                    <div className={cx("bhStatusBillWaiting")}>Đang Làm</div>
                  </Fragment>
                )}
                {bill.status === "WAITPAY" && (
                  <Fragment>
                    <div className={cx("bhStatusBillWaiting")} style={{ color: "#e74c3c" }}>CHƯA THU TIỀN</div>
                  </Fragment>
                )}
                {bill.status === "CANCEL" && (
                  <div className={cx("bhStatusBillCancel")}>Đã Huỷ</div>
                )}

                {bill.status === "COMPLETE" && (
                  <div className={cx("bhStatusBillDone")}>Đã Xong </div>
                )}
              </div>
            </div>
          ))}
        </Fragment>
      )}

      {viewRequests && listCallStaff.length === 0 && (
        <Fragment>
          <div className={cx("billEmptyNote")}>Chưa Có Yêu Cầu Nào</div>
        </Fragment>
      )}

      {viewRequests && listCallStaff.length !== 0 && (
        <Fragment>
          {listCallStaff.map((request, index) => (
            <div className={cx("rqContent")} key={index}>
              <div className={cx("rqItem")}>
                <div className={cx("rqName")}>
                  Khách Hàng: {request.customer_name}
                </div>
                <div className={cx("rqTable")}>Bàn: {request.table}</div>
              </div>
              <div className={cx("rqTime")}>
                Thời gian:
                <span>
                  {" " +
                    moment(request.createdAt, "DD/MM/YYYY, HH:mm:ss").format(
                      "HH:mm A"
                    )}
                </span>
              </div>
            </div>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
}

export default BillHistory;
