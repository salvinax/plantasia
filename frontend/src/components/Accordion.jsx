import React from "react";
import { useState } from "react";
import "../pages/Checkout.css";

function Accordion({ order, products }) {
  const [isClicked, setisClicked] = useState(false);

  return (
    <div>
      <div onClick={() => setisClicked(!isClicked)} className="order-header">
        <p className="order-details">
          ORDER {order.orderID + " - "}
          {new Date(order.orderDate).toLocaleDateString()}
        </p>
        <div className="order-details-right">
          <p>{order.orderPrice}$</p>
          <p>{isClicked ? "-" : "+"}</p>
        </div>
      </div>
      <div className="order-items-ctn">
        {isClicked &&
          products.map((item) => {
            return (
              <div
                key={item.productID + "-" + order.orderID}
                className="single-order-item"
              >
                <img src="/plant1.jpg" alt="" />
                <div className="single-order-item-text">
                  <div className="single-order-item-title">
                    <div className="product-name-order">
                      {item.variantName == "one size"
                        ? item.productName
                        : item.productName +
                          " - " +
                          item.variantName.toLocaleUpperCase()}
                    </div>
                    <div className="product-qtn-order">
                      QUANTITY: {item.quantity}
                    </div>
                    <div className="product-price-order">
                      {item.productPrice}$
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {isClicked && (
          <div className="price-details">
            <div className="border-line"></div>
            <div className="subtotal-div">
              <p> Subtotal :</p>
              <p> {order.subtotal}$</p>
            </div>
            <div className="subtotal-div">
              <p> Shipping :</p>
              <p> {order.shipping}$</p>
            </div>
            <div className="subtotal-div">
              <p> Taxes :</p>
              <p> {order.taxes}$</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Accordion;
