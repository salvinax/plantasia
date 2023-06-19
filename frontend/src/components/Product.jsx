import React from "react";
import "../pages/Shop.css";
import { useNavigate } from "react-router-dom";

function Product({ addToCart, item }) {
  const navigateTo = useNavigate();

  function addToCartHelper() {
    const newItem = {
      id: item.productID,
      name: item.productName,
      img: item.imgLink,
      variant: "one size",
      price: item.minPrice,
    };
    console.log(newItem);
    addToCart(newItem, 1);
  }

  return (
    <>
      <div className="product-area-shop-item">
        <img
          onClick={() => navigateTo("/shop/" + item.productID)}
          src={"/products/" + item.imgLink}
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
    </>
  );
}

export default Product;
