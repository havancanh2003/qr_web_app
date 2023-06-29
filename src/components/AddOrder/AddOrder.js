import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import style from "./AddOrder.scss";
import plusIcon from "../../assets/image/plus_icon-icons.com_66718.png";
import minusIcon from "../../assets/image/free-minus-icon-3108-thumb.png";
const cx = classNames.bind(style);

const AddOrder = (props) => {

    const op = props.obj.options;
    const [add, setAdd] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [check, setCheck] = useState("");
    const arrayFood = [];

    function addDetail() {
        setAdd(true);
        let food = {
            id: props.obj._id,
            img: props.obj.image_detail.path,
            name: props.obj.name,
            price: props.obj.price,
            category: props.obj.category,
            number: quantity,
            options: check,
        };
        let data = JSON.parse(sessionStorage.getItem("obj"));

        if (data === null) {
            arrayFood.push(food);
            console.log(arrayFood);
            sessionStorage.setItem("obj", JSON.stringify(arrayFood));
        } else {
            let data = JSON.parse(sessionStorage.getItem("obj"));
            data.push(food);
            console.log(data);
            sessionStorage.setItem("obj", JSON.stringify(data));
        }
    }
    function decrease() {
        if (quantity === 0) {
            setQuantity(0);
        } else {
            setQuantity(quantity - 1);
        }
    }

    return (
        <Fragment>
            <div>
                <div className={cx("addOrderBox")}>
                    <div className={cx("itemContent")}>
                        <div className={cx("product")}>
                            <div className={cx("img_product")}>
                                <img src={props.obj.image_detail.path} alt="" />
                            </div>
                            <div className={cx("about_product")}>
                                <h4>{props.obj.name}</h4>
                                <p>{props.obj.description}</p>
                                {/* <span>{props.obj.price}đ</span> */}
                                <div className={cx("quantity")}>
                                    <button
                                        onClick={decrease} name="remove-circle">
                                        -
                                    </button>
                                    <span>{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        name="add-circle"
                                    >
                                        +
                                    </button>

                                </div>
                            </div>
                        </div>
                        <div className={cx("optionContainer")}>
                            {op.map((item, index) => (
                                <div key={item} className={cx("optionCheck")}>

                                    <label htmlFor={index}>{item}</label>
                                    <input
                                        onClick={() => setCheck(item)}
                                        type="radio"
                                        name="check"
                                        value={item}
                                        id={index}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className={cx("addCart")}>
                            <button onClick={addDetail}>Add to Cart</button>
                        </div>
                    </div>
                    
                    {add && (
                        <div className={cx("successOrder")}>
                            <div className={cx("successBox")}>
                                <ion-icon name="checkmark-outline"></ion-icon>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* )} */}
        </Fragment>
    );
};

export default AddOrder;
