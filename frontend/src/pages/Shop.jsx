import React, { useEffect, useState, useRef } from "react";
import "./Shop.css";
import Product from "../components/Product";
import { useNavigate, useLocation } from "react-router-dom";
import serverData from "../server.json";

function Shop({ addToCart }) {
  //get entire database of product to display
  const location = useLocation();
  const navigateTo = useNavigate();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("All");
  const [sortID, setSortID] = useState("DEFAULT");

  const [drop, setDrop] = useState(false);
  const dropRef = useRef(null);
  const dropBorder = useRef(null);
  const rooturl = serverData.link;

  const filterNames = ["All", "Plants", "Accessories", "Bestsellers", "Others"];
  const sortNames = ["default", "priceASC", "priceDESC"];

  useEffect(() => {
    console.log(title);
    console.log(sortID);
  });

  useEffect(() => {
    if (dropBorder.current && drop) {
      dropBorder.current.classList.add("activations");
    } else {
      dropBorder.current.classList.remove("activations");
    }
  }, [drop]);

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

  useEffect(() => {
    const linkQuery = window.location.search;
    fetch(rooturl + "/api/product" + linkQuery)
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        if (data.length > 0) {
          setData(data);
          var search = new URLSearchParams(window.location.search);

          if (filterNames.includes(search.get("filter"))) {
            setTitle(search.get("filter"));
          } else {
            setTitle("All");
          }

          if (sortNames.includes(search.get("sort"))) {
            setSortID(search.get("sort"));
          } else {
            setSortID("default");
          }
        }
      })
      .catch((err) => console.log(err));
  }, [window.location.href]);

  //changes everytime a button is cliked
  function filterProducts(e) {
    var target = window.location.search;
    //if url has nothing
    if (!target) {
      navigateTo("?filter=" + e.target.textContent);
    }
    //if url has a filter tag already
    if (target) {
      var search = new URLSearchParams(window.location.search);
      if (search.get("filter")) {
        search.set("filter", e.target.textContent);
        navigateTo("?" + search.toString());
      } else {
        navigateTo("?" + search.toString() + "&filter=" + e.target.textContent);
      }
    }
  }

  function defaultFilter() {
    var search = new URLSearchParams(window.location.search);
    search.delete("filter");
    setTitle("All");
    navigateTo("?" + search.toString());
  }

  function defaultSort() {
    var search = new URLSearchParams(window.location.search);
    search.delete("sort");
    navigateTo("?" + search.toString());
  }

  function sortProducts(name) {
    var target = window.location.search;
    //if url has nothing
    if (!target) {
      navigateTo("?sort=" + name);
    }
    //if url has a filter tag already
    if (target) {
      var search = new URLSearchParams(window.location.search);
      if (search.get("sort")) {
        search.set("sort", name);
        navigateTo("?" + search.toString());
      } else {
        navigateTo("?" + search.toString() + "&sort=" + name);
      }
    }
  }

  function handleSort(name) {
    setDrop(false);
    if (name == "default") {
      setSortID(name);
      defaultSort();
    } else {
      sortProducts(name);
    }
  }

  return (
    <>
      <div className="filter-area">
        <div className="set-bottom">
          <ul>
            <li
              className={title == "All" ? "active-box" : ""}
              onClick={defaultFilter}
            >
              All
            </li>
            <li
              className={title == "Plants" ? "active-box" : ""}
              onClick={filterProducts}
            >
              Plants
            </li>
            <li
              className={title == "Accessories" ? "active-box" : ""}
              onClick={filterProducts}
            >
              Accessories
            </li>
            <li
              className={title == "Bestsellers" ? "active-box" : ""}
              onClick={filterProducts}
            >
              Bestsellers
            </li>
            <li
              className={title == "Others" ? "active-box" : ""}
              onClick={filterProducts}
            >
              Others
            </li>
          </ul>

          <div className="sort-ctn-area">
            <p className="dropdown-title">SORT</p>

            <div ref={dropRef} className="drop-down-class">
              <div
                ref={dropBorder}
                onClick={() => setDrop(!drop)}
                className="drop-down-selected"
              >
                <div className="drop-down-selected-p">
                  <p>{sortID.toLocaleUpperCase()}</p>
                </div>
              </div>
              <div className="align">
                {drop && (
                  <div className="drop-down-content">
                    {sortNames.map((name) => {
                      return (
                        <div
                          key={name}
                          onClick={() => handleSort(name)}
                          className="drop-down-item"
                        >
                          <div className="border-mid"></div>
                          <p>{name.toLocaleUpperCase()}</p>
                        </div>
                      );
                    })}
                    <div />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-area-shop">
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <Product key={item.productID} addToCart={addToCart} item={item} />
            );
          })
        ) : (
          <div className="no-products">NO PRODUCTS WERE FOUND.</div>
        )}
      </div>
    </>
  );
}

export default Shop;
