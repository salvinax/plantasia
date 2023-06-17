import React, { useEffect, useState, useRef } from "react";
import "./Shop.css";
import Product from "../components/Product";
import { useNavigate, useLocation } from "react-router-dom";
import serverData from "../server.json";

function Shop({ addToCart }) {
  //get entire database of product to display
  const location = useLocation();
  const navigateTo = useNavigate();
  var counter = 0;
  const [data, setData] = useState([]);
  const isFirstRenderRef = useRef(true);
  const [title, setTitle] = useState("All");
  const [sortID, setSortID] = useState("DEFAULT");
  const [URL, setURL] = useState("");
  const [dataFound, setDataFound] = useState(false);
  const [drop, setDrop] = useState(false);
  const dropRef = useRef(null);
  const dropBorder = useRef(null);
  const rooturl = serverData.link;

  const filterNames = ["All", "Plants", "Accessories", "Bestsellers", "Others"];
  const sortNames = ["default", "priceASC", "priceDESC"];

  // const firstEl = useRef();

  // useEffect(() => {
  //   const scrollPosition = sessionStorage.getItem("scrollPosition");
  //   if (scrollPosition) {
  //     window.scrollTo({
  //       top: scrollPosition,
  //       left: 0,
  //       behavior: "instant",
  //     });
  //     sessionStorage.removeItem("scrollPosition");
  //   }
  // }, []);

  // useEffect(() => {
  //   if (firstEl.current) {
  //     firstEl.current.classList.add("active-box");
  //   }
  // }, []);

  //skip first two renders
  // useEffect(() => {
  //   if (isFirstRenderRef.current) {
  //     counter = counter + 1;
  //     if (counter == 2) {
  //       isFirstRenderRef.current = false;
  //     }
  //     return;
  //   } else {
  //     const filterUrl = "/shop?filter=" + title + "&sort=" + sortID;
  //     navigateTo(filterUrl);
  //   }
  // }, [title, sortID]);

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
        if (data.length == 0) {
          setDataFound(false);
        } else {
          setDataFound(true);
          console.log(data);
          setData(data);
          var search = new URLSearchParams(window.location.search);
          if (filterNames.includes(search.get("filter"))) {
            setTitle(search.get("filter"));
          }

          // if (sortNames.includes(search.get("sort"))) {
          //   setSortID(search.get("sort"));
          // }
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

  function home() {
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
      // var search = new URLSearchParams(window.location.search);
      // search.set("filter", e.target.textContent);
      navigateTo("?sort=" + name);
      // setURL("?filter=" + e.target.textContent);
    }
    //if url has a filter tag already
    if (target) {
      var search = new URLSearchParams(window.location.search);
      if (search.get("sort")) {
        search.set("sort", name);
        console.log(search.toString());
        navigateTo("?" + search.toString());
      } else {
        navigateTo("?" + search.toString() + "&sort=" + name);
      }
    }
  }

  function handleSort(name) {
    setSortID(name.toLocaleUpperCase());
    setDrop(false);
    if (name == "default") {
      defaultSort();
    } else {
      sortProducts(name);
    }
  }

  return (
    <>
      <div className="nav-area"></div>
      <div className="filter-area">
        <div className="set-bottom">
          <ul>
            <li className={title == "All" ? "active-box" : ""} onClick={home}>
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
            <p>SORT</p>

            <div ref={dropRef} className="drop-down-class">
              <div
                ref={dropBorder}
                onClick={() => setDrop(!drop)}
                className="drop-down-selected"
              >
                <div className="drop-down-selected-p">
                  <p>{sortID}</p>
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
        {data &&
          data.map((item) => {
            return (
              <Product key={item.productID} addToCart={addToCart} item={item} />
            );
          })}
      </div>
    </>
  );
}

export default Shop;
