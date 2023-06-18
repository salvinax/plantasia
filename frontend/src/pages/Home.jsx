import React from "react";
import Carousel from "../components/Carousel";
import Bestseller from "../components/Bestseller";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import FadeIn from "../components/fadeIn";

function Home() {
  const navigateTo = useNavigate();

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

      {/* bestseller section */}
      {/* <div className="bestseller-section">
        <div className="bestseller-items-ctn">
          <div className="bestseller-item">
            <img src="/plant1.jpg" alt="" />
          </div>
          <div className="bestseller-item">
            <img src="/plant1.jpg" alt="" />
          </div>
          <div className="bestseller-item">
            <img src="/plant1.jpg" alt="" />
          </div>
          <div className="bestseller-item">
            <img src="/plant1.jpg" alt="" />
          </div>
        </div>
        <div className="under-bestseller">
          <div
            onClick={() => {
              navigateTo("/shop?filter=Bestsellers");
            }}
            className="bestseller-subtitle"
          >
            shop bestsellers →
          </div>
        </div>
      </div> */}

      <div className="shortcut-section-ctn">
        <div className="shortcut-items">
          <div className="shortcut-item">
            <img src="/pl.jpg" alt="" />
            <div className="shortcut-item-title">plants → </div>
          </div>

          <div className="shortcut-item middle">
            <img src="/balm2.png" alt="" />
            <div className="shortcut-item-title">organic →</div>
          </div>
          <div className="shortcut-item ">
            <img src="/pl1.jpg" alt="" />
            <div className="shortcut-item-title">accessories →</div>
          </div>
        </div>
      </div>

      <div className="best-section">
        <div className="best-half-one">
          <div className="best-ctn-font">
            <div className="best-title">
              FROM MY GARDEN...
              <span className="breakword">TO YOURS</span>
            </div>
            <div className="best-text">
              Here's a hosta plant, super easy to take care, low light. Beginner
              Friendly! Starting at 25$.
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
          <img src="/pl.jpg" alt="" />
          <button className="best-half-two-btn">add to cart</button>
        </div>
      </div>

      {/* infomation column starts */}
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

        <FadeIn delay={"0.6s"}>
          <div className="info-half second">
            <div className="info-mid-home">
              <img
                src="/pink-flowers.jpg"
                className="info-mid-home-img second"
              ></img>
              <div className="home-info-text second">
                <div>Express shipping + Free Pick up in Toronto</div>
                <div>Healthy plants GUARANTEED</div>
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
