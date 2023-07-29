import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import style from "./ShowAll.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { Fragment } from "react";
import Loading from "../../components/loadingScreen/loading";
import leftArrow from "../../assets/image/left-arrow.png";
import AddOrder from "../../components/AddOrder/AddOrder";
import CartIcon from "../../components/CartIcon/index";
import IconBill from "../../components/IconBill";
const cx = classNames.bind(style);

function ShowAll() {
  const navigate = useNavigate();
  const activeSectionRef = useRef(null);
  const [returnHome, setReturnHome] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [detail, setDetail] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [cartIcon, setCartIcon] = useState(true);
  const [category, setCategory] = useState([]);
  const [listDish, setListDish] = useState([]);
  const [obj, setObj] = useState({});
  const [activeButton, setActiveButton] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [manualInteraction, setManualInteraction] = useState(false);
  const [tester, setTester] = useState(false);

  const tableStored = sessionStorage.getItem("table") || 0;
  const token = sessionStorage.getItem("token") || 0;

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);
    socket.on('activeTable', (response) => {
      const tableCheck = response;
      console.log(tableCheck);
      if (tableCheck.isActive === false && tableCheck.name === tableStored) {
        console.log("hien thi thong bao");
        setReturnHome(true)
        //thêm ui
      }
      // const handleReturnHome = () => {
      //   navigate(`/home/${tableCheck.token}`)
      // }
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://117.4.194.207:3003/category/all")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://117.4.194.207:3003/dish/menu/all-actived")
      .then((response) => {
        setListDish(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setDetail(false);
        setOverlay(false);
        setCartIcon(true);
      }
      setSticky(window.scrollY > 59);
      const currentPosition = document.documentElement.scrollTop + 100;

      for (let i = 0; i < category.length; i++) {
        const cat = category[i];
        const section = document.getElementById(cat.name);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            currentPosition >= sectionTop &&
            currentPosition < sectionTop + sectionHeight - 100
          ) {
            if (activeSectionRef.current !== cat.name) {
              activeSectionRef.current = cat.name;
              setActiveButton(cat.name);
            }
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [category]);

  useEffect(() => {
    const handleNavScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleNavScroll);
    return () => window.removeEventListener("scroll", handleNavScroll);
  }, []);

  useEffect(() => {
    if (category.length > 0) {
      const navBarBoxElement = document.querySelector(".navBarBox");
      if (navBarBoxElement && !manualInteraction) {
        // Smoothly scroll the navBarBox based on the scrollPosition
        const scrollValue = scrollPosition/(category.length);
        navBarBoxElement.scrollTo({ left: scrollValue, behavior: "smooth" });
      }
    }
  }, [scrollPosition, manualInteraction]);

  function handleClick(name) {
    const element = document.getElementById(name);
    if (element) {
      // Get the top offset of the target section
      const sectionTop = element.offsetTop;

      // Calculate the position to scroll, a little earlier than the target section
      const scrollToPosition = sectionTop + 59;

      // Set manualInteraction to true before scrolling
      setManualInteraction(true);

      // Scroll to the calculated position
      window.scrollTo({ top: scrollToPosition, behavior: "smooth" });

      // Delay the resetting of manualInteraction to false to ensure smooth scrolling
      setTimeout(() => {
        setManualInteraction(false);
      }, 1); // Adjust the delay time as needed for smooth scrolling
    }
  }


  if (category.length === 0 || listDish.length === 0) {
    return (
      <div>
        {/* <div className={cx("topShowAll")}>
          <button className={cx("backButton")} onClick={() => navigate("/showall")}>
            <img src={leftArrow} alt="icon" />
          </button>
          <p className={cx("topTitle")}>Tất Cả Các Món</p>
        </div> */}
        <div className={cx("loadNote")}>
          {/* <img src={meowLoading} alt="LOADING..."></img>
          <p>LOADING...</p> */}
          <Loading></Loading>
        </div>
      </div>
    )
  }

  const handleDetailState = () => {
    setDetail(false);
    setOverlay(false);
    setCartIcon(true)
  };

  const handleReturnHome = () => {
    navigate(`/home/${token}`)
    setReturnHome(false)
  }

  return (
    <Fragment>
      <IconBill></IconBill>
      {returnHome &&
        <Fragment>
          <div className={cx("rtOverlay")} onClick={handleReturnHome}>
          </div>
          <div className={cx("rtBox")}>
            <div className={cx("rtNote")} >Bàn Của Bạn Đang Không Hoạt Động</div>
            <button className={cx("rtButton")} onClick={handleReturnHome}>Về Trang Chủ</button>
          </div>
        </Fragment>
      }
      {cartIcon && <CartIcon />}
      {/* <div className={cx("topShowAll")}>
        <button className={cx("backButton")} onClick={() => navigate("/menu")}>
          <img src={leftArrow} alt="icon" />
        </button>
        <p className={cx("topTitle")}>Tất Cả Các Món</p>
      </div> */}

      <nav className={`${sticky ? "sticky" : ""}`}>
        <div className={cx("navBarBox")}>
          {category.map((cat, index) => (
            <div key={index} className={cx("navBarElement")}>
              <button
                // id={"-btn"}
                onClick={() => handleClick(cat.name)}
                className={cx("CTA", { active: activeButton === cat.name })}
              >
                {cat.name}
              </button>
            </div>
          ))}

          <div className={cx("navBarElement")}>
            {/* <span>Thêm để không cần sửa</span> */}
            {/* <span>ws</span> */}
          </div>
        </div>
      </nav>

      <div className={cx("content")}>
        {category.map((cat, index) => (
          <div key={index} id={cat.name} className={cx("targetScroll")}>
            <div className={cx("titleWrapper")}>
              <h2>{cat.name}</h2>
            </div>
            <div className={cx("showAllBody")}>
              {listDish
                .filter((dish) => dish.category === cat.name)
                .map((food, index) => (
                  <div
                    key={index}
                    className={cx("boxFoodWrapper", { "boxFoodWrapperZero": food.amount === 0 || "" })}
                    onClick={() => (
                      setObj(food), setDetail(!detail), setOverlay(!overlay), setCartIcon(false)
                    )
                    }>
                    <div className={cx("box_food_1")}>
                      <div className={cx("ZeroAmountBanner")}>Hết Món</div>
                      <img src={food.image_detail.path} alt="" />
                    </div>
                    <div className={cx("foodDescription")}>
                      <h3>{food.name}</h3>
                      <p>{food.description}</p>
                      {/* <span className={cx("ZeroAmount")}>Hết Món</span> */}
                      <span className={cx("foodPrice")}>{food.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>

                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      {overlay && (
        <div
          className={cx("overlay")}
          onClick={() => (setDetail(false), setOverlay(false), setCartIcon(true))}
        ></div>
      )}
      {detail && <AddOrder obj={obj} listDish={listDish} onAddSuccess={handleDetailState} />}
    </Fragment>
  );
}

export default ShowAll;