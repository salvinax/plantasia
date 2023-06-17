import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./account.css";
import Accordion from "../components/Accordion";
import serverData from "../server.json";

function Account() {
  const navigateTo = useNavigate();
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const rooturl = serverData.link;

  useEffect(() => {
    const token = localStorage.getItem("token");

    // if (token) {
    fetch(rooturl + "/api/pastOrders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            if (data.length == 0) {
              console.log("No Past Orders.");
              setData(null);
            } else {
              console.log(data);
              setData(data);
            }
          });
        } else {
          res.json().then((data) => {
            //remove token
            console.log(data);
            // localStorage.removeItem("token");
            // // //ask user to login again
            // navigateTo("/login");
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function LoggingOut() {
    localStorage.removeItem("token");
    navigateTo("/");
  }

  function handleClicks() {
    if (isClicked) {
      setisClicked(false);
    } else {
      setisClicked(true);
    }
  }
  return (
    <>
      <div className="main-ctn-acc">
        <div className="space-btw"></div>
        <div className="order-data-ctn">
          <div className="user-header">
            <p>USER'S PAST ORDERS</p>
            <p onClick={LoggingOut}>log out</p>
          </div>
          {!data && (
            <div className="no-orders">
              <p>NO PAST ORDERS YET. </p>
              <p>SHOP NOW.</p>
            </div>
          )}
          {data &&
            data.map(({ order, products }) => {
              return (
                <Accordion
                  key={order.orderID}
                  order={order}
                  products={products}
                />
              );
            })}
        </div>
      </div>
      {/* <button onClick={LoggingOut}>Log out</button> */}
    </>
  );
}

export default Account;
