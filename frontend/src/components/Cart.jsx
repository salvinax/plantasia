import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Cart({
  cart,
  cartVisible,
  toogleCart,
  removeItem,
  changeQuantity,
  itemNum,
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigateTo = useNavigate();

  useEffect(() => {
    setTotalPrice(() => {
      let subtotalPrice = 0;
      cart.forEach((item) => {
        subtotalPrice += item.quantity * item.price;
      });
      return subtotalPrice;
    });
  }, [cart]);
  return (
    <>
      <div
        className={cartVisible ? "overlay-cart" : "overlay-cart unactive"}
        onClick={toogleCart}
      ></div>
      <div className="cart-ctn">
        <div className="cart-ctn-level">
          <div className="cart-title">
            <div className="cart-title-text">MY CART ({itemNum})</div>
            <div onClick={toogleCart} className="cart-title-x">
              X
            </div>
            {/* <img onClick={toogleCart} src="/x-thin.png" alt="" /> */}
          </div>

          <div className="cart-contents">
            {/* <div className="empty-cart">
              Your Cart is Empty. Check out our products!
            </div> */}
            {cart.map((item) => (
              <div
                key={item.productID + "-" + item.variant}
                className="cart-item"
              >
                <div className="cart-item-img">
                  <img src="/plant1.jpg" alt="" />
                </div>

                <div className="cart-item-txt">
                  <p className="item-title">{item.name.toLocaleUpperCase()}</p>
                  <p className="item-price">{item.price}$</p>
                  <p className="variant-name">
                    {item.variant == "one size" ? null : item.variant}
                  </p>
                  <div className="item-quantity">
                    <div
                      className="cart-arrows"
                      id="left-arrow"
                      onClick={() => changeQuantity(item, -1)}
                    >
                      -
                    </div>
                    <p>{item.quantity}</p>
                    <div
                      className="cart-arrows"
                      id="right-arrow"
                      onClick={() => changeQuantity(item, 1)}
                    >
                      +
                    </div>
                  </div>
                  <div className="remove-btn" onClick={() => removeItem(item)}>
                    REMOVE
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-checkout">
            <div className="cart-subtotal">
              <div>SUBTOTAL</div>
              <div>{totalPrice}$</div>
            </div>

            {cart.length > 0 && (
              <button
                className="checkout-btn"
                onClick={() => navigateTo("/checkout")}
              >
                checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
