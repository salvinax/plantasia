import React, { useEffect, useState } from "react";
import "./Carousel.css";

function Carousel() {
  const btns = document.getElementsByClassName("circle-btn");
  const imglinks = ["img1.jpg", "img2.jpg", "img3.jpg"];
  const [imgSrc, setImageSrc] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(autoSlides, 10000);
    return () => clearTimeout(timeout);
  }, [imgSrc]);

  function handleClick(e) {
    e.preventDefault();
    [...btns].forEach((btn) => {
      btn.classList.remove("active");
    });

    e.target.classList.add("active");

    setImageSrc(e.target.id);
  }

  function autoSlides() {
    setImageSrc((previndex) => {
      const activeSlide = document.getElementById(previndex);
      previndex++;
      if (previndex == imglinks.length) {
        previndex = 0;
      }
      const nextSlide = document.getElementById(previndex);
      activeSlide.classList.remove("active");
      nextSlide.classList.add("active");
      return previndex;
    });
  }

  return (
    <>
      <div className="slideshow-main-container">
        <img alt="img with plants" src={imglinks[imgSrc]} />
        <div className="circle-group">
          <div
            onClick={(e) => handleClick(e)}
            className="circle-btn active"
            id="0"
          ></div>
          <div
            onClick={(e) => handleClick(e)}
            className="circle-btn"
            id="1"
          ></div>
          <div
            onClick={(e) => handleClick(e)}
            className="circle-btn"
            id="2"
          ></div>
        </div>
      </div>
    </>
  );
}

export default Carousel;
