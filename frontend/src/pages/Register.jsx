import React from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import serverData from "../server.json";

function Register() {
  const navigateTo = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const rooturl = serverData.link;

  const [error, setError] = useState(false);

  function checkFields() {
    const regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const filledFields =
      username.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      password.length > 0;

    if (!filledFields) {
      setError("Fields Missing");
    } else if (!regexEmail.test(username)) {
      setError("Invalid Email");
    } else if (password !== password2) {
      setError("Passwords do not match.");
    } else {
      setError("");
      register();
    }
  }

  function register() {
    //check if passwords match
    if (password == password2) {
      const data = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
      };
      fetch(rooturl + "/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            if (data) {
              localStorage.setItem("token", data.token);
              localStorage.setItem("username", data.username);
              setError("Logged in");
              //redirect to user account or go to main page
              navigateTo("/");
              //change navbar if required
            } else {
              console.log(data);
            }
          });
        } else {
          res.json().then((data) => {
            //change error message
            console.log(data.message);
            setError(data.message);
          });
        }
      });
    } else {
      setError("Passwords do not match.");
    }
  }
  return (
    <div>
      <div className="reg-ctn">
        <div className="reg-form-ctn">
          <div className="reg-title">SIGN UP</div>
          <div className="small-border"></div>
          <div className="pair-inputs-ctn">
            <input
              className="input-reg"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="FIRST NAME"
            />
            <input
              className="input-reg"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="LAST NAME"
            />
          </div>
          <input
            className="input-reg large"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="EMAIL"
          />
          <input
            className="input-reg large"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PASSWORD"
          />
          <input
            className="input-reg large"
            type="password"
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="RE-ENTER PASSWORD"
          />

          {error && <div className="error-reg">Error : {error}</div>}

          <button onClick={checkFields} className="reg-btn">
            REGISTER
          </button>
          <div onClick={() => navigateTo("/login")} className="reg-btn-log">
            I HAVE AN ACCOUNT.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
