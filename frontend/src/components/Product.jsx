import React from "react";
import "../pages/Shop.css";
import { Link } from "react-router-dom";
import Productpage from "../pages/Productpage";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Product({ addToCart, item }) {
  const [priceText, setPriceText] = useState();
  const [btnText, setBtnText] = useState();
  const navigateTo = useNavigate();

  useEffect(() => {
    let price, btn;
    if (item.variantType) {
      btn = "view options";
      price = "From " + item.minPrice + "$";
    } else {
      btn = "add to cart";
      price = item.minPrice + "$";
    }

    setBtnText((oldText) => (oldText = btn));
    setPriceText((oldprice) => (oldprice = price));
  });

  function addToCartHelper() {
    const newItem = {
      id: item.productID,
      name: item.productName,
      img: item.imgLink,
      variant: "one size",
      price: item.minPrice,
    };
    addToCart(newItem, 1);
  }

  return (
    <>
      <div className="product-area-shop-item">
        <img
          onClick={() => navigateTo("/shop/" + item.productID)}
          src="./plant1.jpg"
          alt=""
        />
        <div className="product-area-shop-item-title">{item.productName}</div>
        <div className="product-area-shop-item-prices">
          {item.variantType !== null
            ? `From ${item.minPrice}$`
            : `${item.minPrice}$`}
        </div>
        <button
          onClick={
            item.variantType
              ? () => navigateTo("/shop/" + item.productID)
              : () => addToCartHelper()
          }
        >
          {item.variantType == null ? "add to cart" : "see options"}
        </button>
      </div>
      {/* <div className="ctn-item-shop">
        <div
          className="ctn-item-shop-image"
          // onMouseEnter={() =>
          //   props.showCartButton("btn" + props.item.productID)
          // }
          // onMouseLeave={() =>
          //   props.removeCartButton("btn" + props.item.productID)
          // }
        >
          <Link to={"/shop/" + item.productID} state={item}>
            <img src={item.imgLink} alt="" />
          </Link>
        </div>
        <div className="border-line"></div>
        <div className="ctn-product-info">
          {item.productName}
          <div id="pricing">{priceText}</div>
        </div>

        <Link to={item.variantType ? "/shop/" + item.productID : ""}>
          <div
            className="btn-product-shop"
            onClick={item.variantType ? null : () => addToCartHelper()}
          >
            <p>{btnText}</p>
          </div>
        </Link>
        
          </div>
        </div> */}
      {/* </div> */}
    </>
  );
}

export default Product;
