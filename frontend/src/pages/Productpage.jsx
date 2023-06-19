import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Productpage.css";
import serverData from "../server.json";

function Productpage({ addToCart }) {
  const { productId } = useParams();
  const [itemQtn, setItemQtn] = useState(1);
  const [selectVariant, setSelectVariant] = useState(null);
  const [price, setPrice] = useState();
  const [item, setItem] = useState([]);
  const [variantInfo, setVariantInfo] = useState([]);
  const [drop, setDrop] = useState(false);

  const dropRef = useRef(null);
  const dropBorder = useRef(null);
  const rooturl = serverData.link;

  //for dropdown - deletes line under box onClick
  useEffect(() => {
    if (dropBorder.current) {
      if (drop) {
        dropBorder.current.classList.add("activations-new");
      } else {
        dropBorder.current.classList.remove("activations-new");
      }
    }
  }, [drop]);

  //detects if user clicks away from dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setDrop(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropRef]);

  //retrieve product and variant data
  useEffect(() => {
    fetch(rooturl + "/api/product/" + productId)
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((info) => {
        setItem(info[0]);
        if (info.length > 1) {
          const varInfo = info.map((el) => ({
            name: el.variantName,
            price: el.variantPrice,
          }));
          setVariantInfo(varInfo);
          setPrice(varInfo[0].price);
          setSelectVariant(varInfo[0].name);
        } else {
          setSelectVariant("one size");
          setPrice(info[0].variantPrice);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  function changeQuantity(number) {
    setItemQtn((currentQtn) => {
      currentQtn = currentQtn + number;
      if (currentQtn == 0) {
        return 1;
      }
      return currentQtn;
    });
  }

  function addToCartHelper() {
    //ensure user picks a variant
    if ((item.variantType && selectVariant) || item.variantType == null) {
      const newItem = {
        id: item.productID,
        name: item.productName,
        img: item.imgLink,
        variant: selectVariant,
        price: price,
      };
      addToCart(newItem, itemQtn);
    }
  }

  return (
    <div className="product-ctn-whole">
      <div className="product-img-half">
        <div className="product-img-half-ctn">
          <img src={"/products/" + item.imgLink} alt="" />
          <div className="product-quantity">
            <div className="cart-arrows" onClick={() => changeQuantity(-1)}>
              -
            </div>
            <p>{itemQtn}</p>
            <div className="cart-arrows" onClick={() => changeQuantity(1)}>
              +
            </div>
          </div>
        </div>
      </div>

      <div className="product-info-half">
        <div className="product-info-half-ctn">
          <div className="product-name-page">{item.productName}</div>
          <div className="small-border-page"></div>
          <div className="product-price-page">{price}$</div>
          <div className="product-info-page">{item.productDescription}</div>
          {variantInfo.length > 1 && (
            <div ref={dropRef} className="drop-down-class-new">
              <div
                ref={dropBorder}
                onClick={() => setDrop(!drop)}
                className="drop-down-selected-new"
              >
                <div className="drop-down-selected-p">
                  {selectVariant && <p>{selectVariant}</p>}
                </div>
              </div>
              {drop && (
                <div className="align-new">
                  <div className="drop-down-content-new">
                    {variantInfo.map((variant) => {
                      return (
                        <div
                          key={variant.name}
                          onClick={() => {
                            setDrop(!drop);
                            setSelectVariant(variant.name);
                            setItemQtn(1);
                          }}
                          className="drop-down-item-new"
                        >
                          <div className="border-mid-new"></div>
                          <p>{variant.name}</p>
                        </div>
                      );
                    })}
                    <div />
                  </div>
                </div>
              )}
            </div>
          )}
          <button className="cart-btn-product" onClick={addToCartHelper}>
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productpage;
