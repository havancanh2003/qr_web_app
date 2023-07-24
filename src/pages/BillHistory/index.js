import { Fragment, useEffect, useState } from "react";
import style from "./BillHistory.scss";
import axios from "axios";
import classNames from "classnames/bind";
import MoreIcon from "../../assets/image/moreIcon.png";
import moment from "moment";
import "moment/locale/vi";

const cx = classNames.bind(style);

function BillHistory() {
  const [listBill, setListBill] = useState([]);
  //   const [customerName, setCustomerName] = useState(
  //     JSON.parse(sessionStorage.getItem("name")) || []
  //   );
  const customerName = JSON.parse(sessionStorage.getItem("name")) || [];
  const table = JSON.parse(sessionStorage.getItem("table")) || [];

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
          console.log(response);
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

  console.log(listBill);
  if (listBill.length === 0) {
    return "Bạn chưa đặt món";
  }
  return (
    <Fragment>
      <div className={cx("bhWrapper")}>
        <div className={cx("marginTop")}></div>
        {listBill.map((bill, index) => (
          <div className={cx("bhContent")} key={index}>
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
            <div className={cx("bhContainer3")}>
              <img src={MoreIcon} alt="More"></img>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default BillHistory;
