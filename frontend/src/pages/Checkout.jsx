//www.youtube.com/watch?v=e-whXipfRvg&t=720s <- look at this video and go on stripe.js doc to implement stripe
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./checkout.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import serverData from "../server.json";

function Checkout({ closeCart, toogleCart, deleteCart, cart }) {
  const [saveOrder, setSaveOrder] = useState(cart);
  const [prices, setPrices] = useState("");
  const [taxes, setTaxes] = useState("");
  const [amount, setAmount] = useState("");

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const country = "Canada";
  const shippingPrice = 12.0;
  const [postal, setPostal] = useState("");
  const [province, setProvince] = useState("");

  const [orderID, setOrderID] = useState("");

  const [submitError, setSubmitError] = useState("");
  const [paymentAccepted, setPaymentAccepted] = useState(false);

  const element = useElements();
  const stripe = useStripe();
  const navigateTo = useNavigate();
  const rooturl = serverData.link;

  useEffect(() => {
    closeCart();
  }, []);

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "black",
        iconColor: "grey",
        "::placeholder": {
          color: "grey",
        },
      },
      invalid: {
        color: "red",
      },
      complete: {},
    },
    hidePostalCode: true,
  };

  useEffect(() => {
    let subtotal = 0;
    saveOrder.map((item) => {
      subtotal += item.quantity * item.price;
    });
    setPrices(subtotal.toFixed(2));
    let tax = subtotal * 0.13;
    setTaxes(tax.toFixed(2));
    let amount = tax + shippingPrice + subtotal;
    setAmount(amount.toFixed(2));
  });

  async function processPayment() {
    const cardEl = element.getElement(CardElement);
    let amnt = Math.round(amount * 100);

    const totalPrice = { amount: amnt };
    console.log(totalPrice.amount);

    fetch(rooturl + "/api/payment-order", {
      method: "POST",
      body: JSON.stringify(totalPrice),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(async (data) => {
        const clientSecret = data;
        const fullName = firstName + " " + lastName;
        const confirmCardPayment = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardEl,
              billing_details: {
                email: email,
                name: fullName,
              },
            },
          }
        );
        if (confirmCardPayment.paymentIntent) {
          console.log("payment went through");
          setSubmitError("");
          processOrder();

          // method order processing - remove everything from cart, add order to database
          // make order confirmation replace checkout form
          // send confirmation email
        } else if (confirmCardPayment.error) {
          console.log(confirmCardPayment.error?.message);
          setSubmitError("Payment did not go through. Try Again.");
        }
      })
      .catch((e) => {
        console.log(e);
        setSubmitError("Payment did not go through. Try Again.");
      });
  }
  function orderSubmit() {
    //check for email, missing fields
    const regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const filledFields =
      email.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      address.length > 0 &&
      city.length > 0 &&
      country.length > 0 &&
      province.length > 0 &&
      postal.length > 0;
    if (!filledFields) {
      setSubmitError("Fields Missing");
    } else if (!regexEmail.test(email)) {
      setSubmitError("Invalid Email");
    } else {
      setSubmitError("");
      processPayment();
    }
  }

  function processOrder() {
    const orderInfo = {
      orderPrice: amount,
      shipping: shippingPrice,
      taxes: taxes,
      subtotal: prices,
      username: email,
      firstName: firstName,
      lastName: lastName,
      numItems: saveOrder.length,
      street: address,
      city: city,
      province: province,
      pc: postal,
      items: saveOrder,
    };
    //take order summary info and info in fields and add them to database
    //add user if they do not have account
    //delete everything in cart

    fetch(rooturl + "/api/process-order", {
      method: "POST",
      body: JSON.stringify(orderInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(async (data) => {
        setPaymentAccepted(true);
        scrollTop();

        //remove everything in cart
        setOrderID(data);
        console.log(data);
        deleteCart();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="large-ctn-checkout">
        <div className="title-checkout">
          <p className="return-btn" onClick={() => navigateTo("/")}>
            return
          </p>
          <p className="checkout-title-center">CHECKOUT</p>
        </div>

        <div className="order-checkout-info-ctn">
          <div className="user-form">
            {paymentAccepted && (
              <div className="success-blocks">
                <div className="success-block-msg1">
                  YOUR ORDER HAS BEEN PROCESSED!
                </div>
                <div className="success-block-msg2">
                  THANKS FOR SHOPPING WITH US! YOU SHOULD RECEIVE A CONFIRMATION
                  EMAIL SHORTLY!
                </div>
                <div className="success-block-msg3">ORDER ID: #{orderID}</div>
              </div>
            )}

            {!paymentAccepted && (
              <div className="info-form-center">
                <p className="label-form-section">CONTACT INFORMATION</p>
                <div className="pair-input-block">
                  <input
                    className="input-checkout"
                    type="text"
                    placeholder="FIRST NAME"
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                  <input
                    className="input-checkout"
                    type="text"
                    placeholder="LAST NAME"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </div>
                <div className="single-input-line">
                  <input
                    className="input-checkout big"
                    type="text"
                    placeholder="EMAIL"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <p className="label-form-section">SHIPPING INFORMATION</p>

                <div className="single-input-line">
                  <input
                    className="input-checkout big"
                    type="text"
                    placeholder="ADDRESS"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="pair-input-block">
                  <input
                    className="input-checkout"
                    type="text"
                    placeholder="CITY"
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <div className="input-checkout box">CA</div>
                </div>
                <div className="pair-input-block">
                  <input
                    className="input-checkout"
                    type="text"
                    placeholder="POSTAL CODE"
                    onChange={(e) => setPostal(e.target.value)}
                  />
                  <input
                    className="input-checkout"
                    type="text"
                    placeholder="PROVINCE"
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </div>
                <p className="label-form-section">PAYMENT INFORMATION</p>

                <CardElement options={cardElementOptions} />
              </div>
            )}
          </div>

          <div className="order-summary">
            <div className="summary-middle-container">
              <div className="summary-header">ORDER SUMMARY</div>
              <div className="summary-items">
                {saveOrder.map((item) => {
                  return (
                    <div
                      key={item.name + "-" + item.variant}
                      className="summary-item"
                    >
                      <div className="summary-item-img-ctn">
                        <img src={"/products/" + item.img} alt="" />
                      </div>
                      <div className="summary-item-text-ctn">
                        <p className="sum-product-name">
                          {item.name.toUpperCase()}
                        </p>
                        <p className="sum-product-price">
                          {item.quantity} x {item.price}$
                        </p>
                        <p className="sum-product-var">
                          {item.variant == "one size" ? "" : item.variant}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="summary-price-section">
                <div className="border-line"></div>
                <div className="subtotal-div">
                  <p> Subtotal :</p>
                  <p> {prices}$</p>
                </div>
                <div className="subtotal-div">
                  <p> Shipping :</p>
                  <p> {shippingPrice.toFixed(2)}$</p>
                </div>
                <div className="subtotal-div">
                  <p> Taxes :</p>
                  <p> {taxes}$</p>
                </div>
                <div className="border-line"></div>
                <div className="subtotal-div">
                  <p> TOTAL</p>
                  <p> {amount}$</p>
                </div>
              </div>
              {submitError}
              <div className="order-btn-ctn">
                {!paymentAccepted && (
                  <button onClick={orderSubmit} className="order-btn">
                    PLACE ORDER
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
