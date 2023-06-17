import React from "react";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import serverData from "../server.json";

function Login() {
  const navigateTo = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const rooturl = serverData.link;

  function LoggingIn() {
    const data = {
      username: username,
      password: password,
    };

    fetch(rooturl + "/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          setError("Logged in");
          //redirect to user account or go to main page
          navigateTo("/");
          //change navbar if required
          console.log(data);
        });
      } else {
        res.json().then((data) => {
          //change error message
          console.log(data.message);
          setError(data.message);
        });
      }
    });
  }

  return (
    <div className="login-ctn">
      <div className="center-login">
        <p className="login-title">LOGIN</p>
        <div className="small-border"></div>

        <input
          className="input-log"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="EMAIL"
        />

        <input
          className="input-log"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="PASSWORD"
        />

        {error && <div className="error-msg-log">Error: {error}</div>}
        <button onClick={LoggingIn} className="btn-log">
          SIGN IN
        </button>

        <div onClick={() => navigateTo("/register")} className="btn-log-reg">
          DON&#39; T HAVE AN ACCOUNT?
        </div>
      </div>
    </div>
  );
}

export default Login;
