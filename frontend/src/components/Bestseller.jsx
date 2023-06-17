import React from "react";
import "./Bestseller.css";

function Bestseller() {
  return (
    <div className="bestseller-container">
      <h1>Our Bestsellers</h1>
      <div className="scrolling-container">
        <div className="scroll-items-group">
          <div className="item-scroll"></div>
          <div className="item-scroll"></div>
          <div className="item-scroll"></div>
          <div className="item-scroll"></div>
          <div className="item-scroll"></div>
          {/* duplicates for sliding carousel */}
          <div className="item-scroll"></div>
          <div className="item-scroll"></div>
          <div className="item-scroll"></div>
          <div className="item-scroll"></div>
          <div className="item-scroll"></div>
        </div>
      </div>
      <div className="btn-shop-best-container">
        <button className="btn-shop-best">SHOP BESTSELLERS</button>
      </div>
    </div>
  );
}

export default Bestseller;
