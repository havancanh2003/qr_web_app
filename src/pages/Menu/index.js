
// import { useState, useEffect } from "react";
// import { Fragment } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { io } from "socket.io-client";
// import classNames from "classnames/bind";
// import style from "./Menu.module.scss";
// import AddOrder from "../../components/AddOrder/AddOrder";
// import CartIcon from "../../components/CartIcon/index";
// import IconBill from "../../components/IconBill";
// import Loading from "../../components/loadingScreen/loading";

// const cx = classNames.bind(style);

// function Menu() {
//   const [detail, setDetail] = useState(false);
//   const [overlay, setOverlay] = useState(false);
//   const [tableChanged, setTableChanged] = useState(false);
//   const [returnHome, setReturnHome] = useState(false);
//   const [cartIcon, setCartIcon] = useState(true);
//   const [listBestSeller, setLishBestSeller] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [listDish, setListDish] = useState([]);
//   const [obj, setObj] = useState({});
//   const [type, setType] = useState();

//   const navigate = useNavigate();

//   const tableStored = sessionStorage.getItem("table") || 0;
//   const token = sessionStorage.getItem("token") || 0;

//   useEffect(() => {
//     const socket = io(process.env.REACT_APP_API_URL);
//     socket.on('activeTable', (response) => {
//       const tableCheck = response;
//       console.log(tableCheck);
//       if (tableCheck.isActive === false && tableCheck.name === tableStored) {
//         setReturnHome(true)
//       }
//     });
//   }, []);

//   // useEffect(() => {
//   //   if(tableChanged.isActive === false){
//   //     console.log(tableChanged.isActive);
//   //     // Navigate(`/home/${tableChanged}`)
//   //   }
//   // }, [tableChanged]);

//   useEffect(() => {
//     axios
//       .get("http://117.4.194.207:3003/dish/menu/best-seller")
//       .then((response) => {
//         setLishBestSeller(response.data);
//       })
//       .catch((error) => console.log(error));
//     axios
//       .get("http://117.4.194.207:3003/dish/menu/all-actived")
//       .then((response) => {
//         setListDish(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     axios
//       .get("http://117.4.194.207:3003/category/all")
//       .then((response) => {
//         const data = response.data;
//         setCategories(data);
//         setType(data[0]);
//       })
//       .catch((error) => console.log(error));
//   }, []);

//   if (categories.length === 0 || listDish.length === 0) {
//     return (
//       <div className={cx("loadNote")}>
//         {/* <img src={meowLoading} alt="LOADING..."></img>
//         <p>LOADING...</p> */}
//         <Loading></Loading>
//       </div>
//     )
//   }

//   const handleDetailState = () => {
//     setDetail(false);
//     setOverlay(false);
//     setCartIcon(true);
//   };


//   const handleReturnHome = () => {
//     navigate(`/home/${token}`)
//     setReturnHome(false)
//   }

//   return (
//     <Fragment>
//       <IconBill></IconBill>
//       {returnHome &&
//         <Fragment>
//           <div className={cx("rtOverlay")} onClick={handleReturnHome}>
//           </div>
//           <div className={cx("rtBox")}>
//             <div className={cx("rtNote")} >Bàn Của Bạn Đang Không Hoạt Động</div>
//             <button className={cx("rtButton")} onClick={handleReturnHome}>Về Trang Chủ</button>
//           </div>
//         </Fragment>
//       }
//       <section className={cx("MenuBody")}>
//         <div className={cx("tiltle_container")}>
//           <h3>Đề Xuất Cho Bạn:</h3>
//           <Link to={"/showall"}>Xem thêm</Link>
//         </div>
//         <div className={cx("food_best_deal")}>
//           {listBestSeller.map((food) => (
//             <div
//               key={food._id}
//               onClick={() => (
//                 setObj(food), setDetail(!detail), setOverlay(!overlay), setCartIcon(false)
//               )}
//               className={cx("box_food_1", { "boxFoodWrapperZero": food.amount === 0 || "" })}
//             >
//               <div className={cx("imageBorder")}>
//                 <div className={cx("ZeroAmountBanner")}>Hết Món</div>
//                 <img src={food.image_detail.path} alt="" />

//               </div>
//               <div className={cx("about_food")}>
//                 <p>
//                   {food.name}
//                 </p>
//                 <span>{food.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className={cx("title_choose")}>
//           {/* <h3>Các Thể Loại:</h3> */}
//           <nav>
//           <div className={cx("Category_chose")}>
//             {categories.map((cate) => (
//               <button
//                 //className="Category"
//                 key={cate._id}
//                 onClick={() => setType(cate)}
//                 className={cx({ active: type === cate })}
//               >
//                 {cate.name}
//               </button>
//             ))}
//           </div>
//         </nav>
//         </div>
//         <div className={cx("categoryContent")}>
//           {listDish
//             .filter((dish) => dish.category === type.name)
//             .map((food, index) => (
//               <div
//                 key={index}
//                 onClick={() => (
//                   setObj(food), setDetail(!detail), setOverlay(!overlay), setCartIcon(false)
//                 )}
//                 className={cx("boxFoodWrapper", { "boxFoodWrapperZero": food.amount === 0 || "" })}
//               >
//                 <div className={cx("boxFoodImage")}>
//                   <div className={cx("ZeroAmountBanner")}>Hết Món</div>
//                   <img src={food.image_detail.path} alt="" />
//                 </div>
//                 <div className={cx("boxFoodAbout")}>
//                   <h4>{food.name}</h4>
//                   <p>{food.description}</p>
//                   <span>{food.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
//                 </div>
//               </div>
//             ))}
//         </div>

//       </section>
//       {cartIcon && <CartIcon />}
//       {overlay && (
//         <div
//           className={cx("overlay")}
//           onClick={() => (setDetail(false), setOverlay(false), setCartIcon(true))}
//         ></div>
//       )}
//       {detail && <AddOrder obj={obj} listDish={listDish} onAddSuccess={handleDetailState} />}
//     </Fragment>
//   );
// }

// export default Menu;
