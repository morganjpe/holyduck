import React, { useState, useEffect } from "react";
import { ThemeProvider } from "emotion-theming";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { theme } from "./theme";

import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Confirmation from "./pages/Confirmation";
import Management from "./pages/Management";

// auth
import Login from "./components/Login";
import Authorised from "./components/Authorise";

const App = () => {
  const [authorised, setAuthorised] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token && token.length) {
      const decodedToken = jwt_decode(token);
      if (Date.now() < decodedToken.exp * 1000) {
        axios
          .get("http://localhost:3001/authorise", {
            headers: {
              token,
            },
          })
          .then((res) => {
            if (res.status === 200) setAuthorised(true);
          })
          .catch((err) => console.log(err));
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Authorised authorised={authorised}>
              <Orders authorised={authorised} />
            </Authorised>
          </Route>
          <Route path="/confirmation">
            <Confirmation />
          </Route>
          <Route path="/management">
            <Authorised authorised={authorised}>
              <Management />
            </Authorised>
          </Route>
          <Route path="/">
            <Menu />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
