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
    const name = localStorage.getItem("username");

    if (token && name) {
      fetch(rooturl + "/api/pastOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status == 200) {
            res.json().then((data) => {
              if (data.length == 0) {
                // console.log("No Past Orders.");
                setData(null);
              } else {
                setData(data);
              }
            });
            setUser(name.toLocaleUpperCase());
          } else {
            res.json().then((data) => {
              //remove token
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              //ask user to login again
              navigateTo("/login");
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      //remove token
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      //ask user to login again
      navigateTo("/login");
    }
  }, []);

  function LoggingOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigateTo("/");
  }

  return (
    <>
      <div className="main-ctn-acc">
        <div className="space-btw"></div>
        <div className="order-data-ctn">
          <div className="user-header">
            <p>{user}'S PAST ORDERS</p>
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
    </>
  );
}

export default Account;
