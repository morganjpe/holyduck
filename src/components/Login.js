import axios from "axios";
import React, { useState, useEffect } from "react";
import { styled } from "twin.macro";
import { Link } from "react-router-dom";

// components
import { Button } from "./Button";

const Login = () => {
  const [state, setState] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (
      window.localStorage.getItem("token") &&
      window.localStorage.getItem("token").length
    ) {
      setState(true);
    }
  }, []);

  const gatherFormData = (e) => {
    e.preventDefault();
    const { loginEmail, loginPassword } = e.target.elements;

    axios
      .post("https://holy-duck-server-42v9n.ondigitalocean.app/authenticate", {
        crossDomain: true,
        email: loginEmail.value,
        password: loginPassword.value,
      })
      .then(({ data }) => {
        const token = data.token;
        window.localStorage.setItem("token", token);
        setState(true);
      })
      .catch((err) => setErr("invalid credentials"));
  };

  if (state) {
    return (
      <div>
        <Link to="/">Menu</Link>
        <br />
        <Link to="/orders">Orders</Link>
        <br />
        <Link to="/management">Management</Link>
      </div>
    );
  }

  return (
    <Login.form onSubmit={gatherFormData}>
      <div role="alert">{err ? err : ""}</div>
      <label htmlFor="loginEmail">Login Email</label>
      <input type="email" id="loginEmail" placeholder="Email Address" />
      <label htmlFor="loginPassword">Login Password</label>
      <input type="password" id="loginPassword" placeholder="password" />
      <Button style={{ borderRadius: "6px" }}>login</Button>
    </Login.form>
  );
};

Login.form = styled.form`
  top: 50%;
  left: 50%;
  width: 320px;
  padding: 15px;
  transform: translate(-50%, -50%);
  position: absolute;
  border: 1px solid #eee;
  border-radius: 6px;
  background: white;
  label {
    display: block;
  }
  input {
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 20px;
    display: block;
    width: 100%;
    border: 1px solid #eee;
  }
  button {
    width: 100%;
  }
  [role="alert"] {
    font-size: 12px;
    color: red;
  }
`;

export default Login;
