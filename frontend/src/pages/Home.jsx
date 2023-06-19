import React, { useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import FadeIn from "../components/fadeIn";
import serverData from "../server.json";
import { useState } from "react";

function Home({ addToCart }) {
  const navigateTo = useNavigate();
  const rooturl = serverData.link;
  const [item, setItem] = useState([]);

  useEffect(() => {
    fetch(rooturl + "/api/product/8")
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((info) => {
        setItem(info[0]);
      })
      .catch((err) => console.log(err.message));
  }, []);

  function addToCartHelper() {
    const newItem = {
      id: item.productID,
      name: item.productName,
      img: item.imgLink,
      variant: item.variantName,
      price: item.variantPrice,
    };
    addToCart(newItem, 1);
  }

  return (
    <>
      <div className="big-home-ctn">
        {/* herosection starts */}
        <div className="title-home">p l a n t a s i a</div>
        <div className="main-img-home-ctn">
          <div className="side-ctn-1"></div>
          <div className="home-img-ctn">
            <img src="/clementine-img.jpg" alt="" />
          </div>
          <div className="side-ctn-2"></div>
        </div>
        <button onClick={() => navigateTo("/shop")} className="main-btn">
          shop
        </button>
      </div>

      {/* about section  */}
      <div className="about-section">
        <div className="about-section-text">
          <span className="breakword"> hi i’m salvina!</span> i'm passionate
          about making products that are 100% natural and sourced from my
          garden.
        </div>
        <div className="about-section-socials">
          <a
            className="social-el"
            href="https://www.instagram.com/?hl=en"
            target="_blank"
          >
            instagram →
          </a>
        </div>
      </div>

      <div className="shortcut-section-ctn">
        <div className="shortcut-items">
          <div
            onClick={() => navigateTo("/shop?filter=Plants")}
            className="shortcut-item"
          >
            <img src="/plant.jpg" alt="" />
            <div className="shortcut-item-title">plants → </div>
          </div>

          <div
            onClick={() => navigateTo("/shop?filter=Others")}
            className="shortcut-item middle"
          >
            <img src="/balm.png" alt="" />
            <div className="shortcut-item-title">organic →</div>
          </div>
          <div
            onClick={() => navigateTo("/shop?filter=Accessories")}
            className="shortcut-item "
          >
            <img src="/pots1.jpg" alt="" />
            <div className="shortcut-item-title">accessories →</div>
          </div>
        </div>
      </div>

      {/* bestseller section */}

      <div className="best-section">
        <div className="best-half-one">
          <div className="best-ctn-font">
            <div className="best-title">
              FROM MY GARDEN...
              <span className="breakword">TO YOURS</span>
            </div>
            <div className="best-text">
              {item.productDescription}
              <span className="breakword space">
                Starting from {Math.floor(item.variantPrice)}$.
              </span>
            </div>

            <div
              onClick={() => {
                navigateTo("/shop?filter=Bestsellers");
              }}
              className="best-link"
            >
              SHOP BESTSELLERS →
            </div>
          </div>
        </div>
        <div className="best-half-two">
          <img
            onClick={() => navigateTo("/shop/" + item.productID)}
            src={item.imgLink}
            alt=""
          />
          <button onClick={addToCartHelper} className="best-half-two-btn">
            add to cart
          </button>
        </div>
      </div>

      {/* infomation columns starts */}
      <div className="store-info-ctn">
        <FadeIn>
          <div className="info-half">
            <div className="info-mid-home">
              <div className="home-info-text">
                <div>
                  Express shipping +
                  <span className="breakword"> Free Pick up in Toronto</span>
                </div>
                <div>Healthy plants GUARANTEED</div>
                <div>Handmade Goods made with Love</div>
              </div>
              <img src="/red-flowers.jpg" className="info-mid-home-img"></img>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="info-half second">
            <div className="info-mid-home">
              <img
                src="/pink-flowers.jpg"
                className="info-mid-home-img second"
              ></img>
              <div className="home-info-text second">
                <div>Houseplants and Outdoor Plants</div>
                <div>100% Natural Plant Products</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* sign up banner */}
      <div className="signup-banner-ctn">
        <div className="signup-contents">
          <div className="signup-text">
            Sign up to get exclusive
            <span className="breakword">offers!</span>
          </div>
          <button
            onClick={() => navigateTo("/register")}
            className="signup-btn"
          >
            sign up
          </button>
        </div>
      </div>

      {/* shop shortcut section */}
    </>
  );
}

export default Home;
