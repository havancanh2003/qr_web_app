import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./BillIcon.scss";
// import cartIcon from "../../assets/image/cart-icon.jpg";
import bIcon from "../../assets/image/historyIcon.png";
const cx = classNames.bind(style);
function IconBill() {
    const navigate = useNavigate();

    return (  
        <Fragment>
            <div className={cx("biWrapper")}>
                <img src={bIcon} alt="Hoá Đơn" onClick={() => {navigate("/billhistory")}}></img>
            </div>
        </Fragment>
    )
}

export default IconBill;

// const cx = classNames.bind(style);
// const Giohang = () => {
//     const navigate = useNavigate();
//     const [state, setState] = useState([]);
//     const initialNum = 0;
//     const [num, setNum] = useState(initialNum)
//     const storedSession = JSON.parse(sessionStorage.getItem("obj")) || [];

//     useEffect(() => {
//         setState(storedSession);
//         let delta = 0;
//         for(const item in storedSession){
//             delta = delta + storedSession[item].number
//         }
//         setNum(delta)
//     }, []);

//     return (
//         <div className={cx("iconBorder")}>
//             <button onClick={() => navigate("/cart")}>
//                 <div className={cx("notificationCart")}>
//                     <p>{num}</p>
//                 </div>
//                 <img src={cartIcon2}></img>
//             </button>
//         </div>
//     )
// }

// export default Giohang;