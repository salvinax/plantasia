import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import Productpage from "./pages/Productpage";
import Cart from "./components/Cart";
import NotFound from "./pages/NotFound";
import Scroll from "./components/Scroll";
import Login from "./components/Login";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Register from "./pages/Register";

function App() {
  //for stripe
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(import.meta.env.VITE_STRIPE_PUB)
  );

  //for sliding cart
  const [cartVisible, setCartVisible] = useState(false);
  const [itemNum, setItemNum] = useState(0);

  //retrieve cart from localStorage
  const [cart, setCart] = useState(() => {
    const localValue = localStorage.getItem("CARTITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("CARTITEMS", JSON.stringify(cart));
  }, [cart]);

  //check if item is alreay in cart if yes, then only increase quantity
  function addToCart(item, qtn) {
    let flag = 0;
    console.log(item);
    console.log(cart);

    const updateItems = cart.map((el) => {
      if (el.id === item.id && el.variant === item.variant) {
        flag = 1;
        let newQtn = parseInt(el.quantity) + parseInt(qtn);
        return { ...el, quantity: newQtn };
      }
      return el; // Return other items unchanged
    });

    if (flag == 0) {
      const newitem = { ...item, quantity: qtn };
      setCart([newitem, ...cart]);
    } else {
      setCart(updateItems);
    }

    setCartVisible(true);
    toogleCart();
  }

  //delete cart once order is processed - checkout
  function deleteCart() {
    setCart(() => {
      return [];
    });
  }

  //remove cart item
  function removeItem(item) {
    setCart((currentCart) => {
      return currentCart.filter((current) => {
        return !(
          (current.id == item.id && current.variant == item.variant)
          //use || instead of && opposite for filter
        );
      });
    });
  }

  //changes quantity of cart item - if 0 delete item from cart
  function changeQuantity(item, number) {
    const newQ = item.quantity + number;
    if (newQ == 0) {
      setCart((currentCart) => {
        return currentCart.filter((currentItem) => {
          return !(
            currentItem.id == item.id && currentItem.variant == item.variant
          );
        });
      });
    } else {
      setCart((currentCart) => {
        return currentCart.map((el) => {
          if (el.id == item.id && el.variant == item.variant) {
            let newQtn = el.quantity + number;
            return { ...el, quantity: newQtn };
          }
          return el;
        });
      });
    }
  }

  function toogleCart() {
    if (cartVisible) {
      document.querySelector(".cart-ctn").classList.remove("act");
      document.body.classList.remove("stop-scroll");
      setCartVisible(false);
    } else {
      document.querySelector(".cart-ctn").classList.add("act");
      document.body.classList.add("stop-scroll");
      setCartVisible(true);
    }
  }

  //close cart indefinetly - used for checkout page
  function closeCart() {
    setCartVisible(false);
    document.querySelector(".cart-ctn").classList.remove("act");
    document.body.classList.remove("stop-scroll");
  }

  //counts cart item number
  useEffect(() => {
    setItemNum(() => {
      let itemquantity = 0;
      cart.forEach((item) => {
        itemquantity += item.quantity;
      });
      return itemquantity;
    });
  }, [cart]);

  return (
    <>
      <div className="scroll-control">
        <BrowserRouter>
          <Scroll />
          <Navbar toogleCart={toogleCart} itemNum={itemNum} />
          <Cart
            cart={cart}
            cartVisible={cartVisible}
            toogleCart={toogleCart}
            removeItem={removeItem}
            changeQuantity={changeQuantity}
            itemNum={itemNum}
          />

          <Routes>
            <Route path="/" exact element={<Home addToCart={addToCart} />} />
            <Route
              path="/shop"
              exact
              element={<Shop addToCart={addToCart} />}
            />
            <Route
              path="/shop/:productId"
              exact
              element={<Productpage addToCart={addToCart} />}
            />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/account" exact element={<Account />} />

            <Route
              path="/checkout"
              exact
              element={
                <Elements stripe={stripePromise}>
                  <Checkout
                    closeCart={closeCart}
                    deleteCart={deleteCart}
                    cart={cart}
                  />
                </Elements>
              }
            />

            <Route path="*" exact element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
