import classNames from "classnames";
import axios from "axios";
import styles from "./menu.scss";
import HomeIcon from "../../assets/image/Icon/home.png";
import SearchIcon from "../../assets/image/Icon/search.png";
import CancelIcon from "../../assets/image/Icon/close.png";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import food from "../../assets/image/Icon/fast-food-19.png";
import plus from "../../assets/image/Icon/plus.png";
import minus from "../../assets/image/Icon/minus.png";
import cart from "../../assets/image/Icon/grocery-store.png";
import rightArrow from "../../assets/image/Icon/right-arrow.png";
const cx = classNames.bind(styles);
function Menu() {
  const navigate = useNavigate();
  const token =
    localStorage.getItem("token") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRpZXAiLCJwaG9uZW51bWJlciI6IjA5NjE0MTk4MzI5IiwiZW1haWwiOiJob2FuZ3h1YW50aWVwQGdtYWlsLmNvbSIsImFnZSI6MTgsImFkZHJlc3MiOiJOYW0gxJDhu4tuaCIsInBhc3N3b3JkIjoiJDJiJDA4JE9SbXB2a3BYNzhQeXVNR2ZVU3U5SnV4bVFjeEFZZXFCbHNrWFcwNDU5b1dSNWowOWlQODdpIiwiY3JlYXRlZEF0IjoiMjAyNC0wOC0wNFQwNjo1MjozNS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyNC0wOC0wNFQwNjo1MjozNS4wMDBaIiwiaWF0IjoxNzIyNzg0NTQ1LCJleHAiOjE3MjI4NzA5NDV9.Ppv4Ju0j9dQtTs2Nnb71FZMVqYkG3qZPtnWF6XY5ANg";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [emblaRef] = useEmblaCarousel({ dragFree: true });
  // Khởi tạo biến theo dõi cart
  const [hasItemsInCart, setHasItemsInCart] = useState(false);
  const [totalCartQuantity, setTotalCartQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [reloadCart, setReloadCart] = useState(false);
  // Khởi tạo biến theo dõi page và số lượng page tối đa
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  // Khởi tạo trạng thái cho danh sách dish và danh sách category
  const [dishList, setDishList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  // Khởi tạo trạng thái cho tìm kiếm
  const [searchText, setSearchText] = useState("");

  // Khởi tạo trạng thái cho biến theo dõi category
  const [currentCategoryId, setCurrentCategoryId] = useState(0);

  //get all category list
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/v1/category/all`, config)
      .then((response) => {
        const data = response.data;
        if (!!data) {
          if (data.status === 200) {
            setCategoryList(data.listCategories);
            setCurrentCategoryId(data.listCategories[0].id);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //get INIT dish list
  useEffect(() => {
    setDishList([]);
    if (currentPage === 1 && dishList.length === 0 && searchText === "") {
      //get init dish list
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/v1/dish/searchDishes?page=${currentPage}&pageSize=10`,
          config
        )
        .then((response) => {
          const data = response.data;
          if (!!data) {
            if (data.status === 200) {
              setDishList(data.data.dishes);
              setMaxPages(data.data.pagesNumber);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (searchText !== "") {
      //get dish by search
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/v1/dish/searchDishes?page=${currentPage}&search=${searchText}&pageSize=10`,
          config
        )
        .then((response) => {
          const data = response.data;
          if (!!data) {
            if (data.status === 200) {
              setCurrentCategoryId(0);
              setDishList(data.data.dishes);
              setMaxPages(data.data.pagesNumber);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //get dish by category
      setCurrentPage(1);
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/v1/dish/searchDishes?page=1&categoryId=${currentCategoryId}&pageSize=10`,
          config
        )
        .then((response) => {
          const data = response.data;
          if (!!data) {
            if (data.status === 200) {
              setDishList(data.data.dishes);
              setMaxPages(data.data.pagesNumber);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchText, currentCategoryId]);

  //load next page
  useEffect(() => {
    if (currentPage > 1) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/v1/dish/searchDishes?page=${currentPage}&pageSize=10`,
          config
        )
        .then((response) => {
          const data = response.data;
          if (data && data.status === 200) {
            // Kết hợp mảng cũ với mảng mới lấy từ API
            setDishList((prevDishes) => [...prevDishes, ...data.data.dishes]);
            setMaxPages(data.data.pagesNumber);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, maxPages]);

  //check cart
  useEffect(() => {
    // Gọi hàm kiểm tra khi component mount
    checkCartContents();
  }, []);

  useEffect(() => {
    const loadCartItems = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    };

    loadCartItems();
  }, [reloadCart]);

  // Hàm để kiểm tra nội dung giỏ hàng
  const checkCartContents = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setReloadCart(!reloadCart);
    if (cart && cart.length > 0) {
      setHasItemsInCart(true);
      const totalQuantity = cart.reduce(
        (total, item) => total + item.cartQuantity,
        0
      );

      // Cập nhật trạng thái với tổng số lượng sản phẩm
      setTotalCartQuantity(totalQuantity);
    } else {
      setHasItemsInCart(false);
      setTotalCartQuantity(0);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadNextPage();
    }
  };

  const loadNextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleImageError = (e) => {
    console.log(e.target.src);

    e.target.src = food; // Đặt nguồn ảnh mặc định
  };

  const handleSelectCategory = (category) => {
    setCurrentCategoryId(category.id);
  };

  function addToLocalCart(item, type) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingItemIndex = cart.findIndex((x) => x.id === item.id);

    if (existingItemIndex !== -1) {
      //Cập nhật số lượng dựa trên type
      if (type === "ADD") {
        cart[existingItemIndex].cartQuantity += 1;
        checkCartContents();
      } else if (type === "MINUS") {
        if (
          cart[existingItemIndex].cartQuantity > 1 &&
          cart[existingItemIndex].cartQuantity < 100
        ) {
          // Giảm số lượng nếu lớn hơn 1
          cart[existingItemIndex].cartQuantity -= 1;
          checkCartContents();
        } else {
          // Xóa sản phẩm khỏi giỏ hàng nếu số lượng về 0
          cart.splice(existingItemIndex, 1);
          checkCartContents();
        }
      }
    } else {
      // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng với cartQuantity và note
      const newItem = {
        ...item,
        cartQuantity: 1, // Sử dụng cartQuantity từ đầu vào
        note: "", // Sử dụng note từ đầu vào
      };
      cart.push(newItem);
      checkCartContents();
    }

    // Lưu giỏ hàng trở lại vào Local Storage
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return (
    <div className={cx("page-menu-restaurant")}>
      <div className={cx("menu-top-bar")}>
        <div
          className={cx("return-home-container")}
          onClick={() => navigate("/home/token")}
        >
          <img src={HomeIcon} alt="Home" />
        </div>
        <div className={cx("search-component")}>
          <img src={SearchIcon} alt="Icon"></img>
          <input
            value={searchText}
            placeholder="Bạn muốn tìm món gì?"
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          {searchText !== "" && (
            <img
              src={CancelIcon}
              alt="Icon"
              onClick={() => setSearchText("")}
            ></img>
          )}
        </div>
      </div>
      <div className={cx("category-container")}>
        <div className={cx("embla")} ref={emblaRef}>
          <div className={cx("embla__container")}>
            {categoryList.map((category, index) => (
              <div
                className={cx("embla__slide")}
                key={index}
                onClick={() => handleSelectCategory(category)}
              >
                <div
                  className={cx("embla__slide__number", {
                    active: category.id === currentCategoryId,
                  })}
                >
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={cx("menu-content-body")}>
        <div className={cx("header-area")}></div>
        <div className={cx("dish-list-container")}>
          {dishList.map((dish) => (
            <div key={dish.id} className={classNames("dish-container")}>
              <div className={classNames("image-container")}>
                <img src={dish.image} alt="Ảnh" onError={handleImageError} />
              </div>
              <div className={classNames("dish-name")}>{dish.name}</div>
              <div className={classNames("price-and-plus")}>
                <div className={classNames("dish-price")}>
                  {dish.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
                {cartItems.some((item) => item.id === dish.id) && (
                  <div className={cx("action-with-item-in-cart")}>
                    <div className={classNames("dish-add-to-cart")}>
                      <img
                        src={minus}
                        alt="Bớt"
                        onClick={() => addToLocalCart(dish, "MINUS")}
                      />
                    </div>
                    <div className={cx("cartQuantity")}>
                      {
                        cartItems.find((item) => item.id === dish.id)
                          .cartQuantity
                      }
                    </div>
                    <div className={classNames("dish-add-to-cart")}>
                      <img
                        src={plus}
                        alt="Thêm"
                        onClick={() => addToLocalCart(dish, "ADD")}
                      />
                    </div>
                  </div>
                )}
                {!cartItems.some((item) => item.id === dish.id) && (
                  <div className={classNames("dish-add-to-cart")}>
                    <img
                      src={plus}
                      alt="Thêm"
                      onClick={() => addToLocalCart(dish, "ADD")}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 && (
          <div
            className={cx("bottom-cart-bar")}
            onClick={() => navigate("/orderdetails")}
          >
            <div className={cx("lead-icon")}>
              <img src={cart} alt="Cart"></img>
            </div>
            <div className={cx("text-cart-bar")}>
              Xem giỏ hàng ({cartItems.length})
            </div>
            <div className={cx("trail-icon")}>
              <img src={rightArrow} alt="Right"></img>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
