import React from "react";
import { ThemeProvider } from "emotion-theming";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { theme } from "./theme";

import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Confirmation from "./pages/Confirmation";
import Management from "./pages/Management";

// auth
import Login from "./components/Login";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* <AuthProvider> */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/confirmation">
            <Confirmation />
          </Route>
          <Route path="/management">
            <Management />
          </Route>
          <Route path="/">
            <Menu />
          </Route>
        </Switch>
        {/* </AuthProvider> */}
      </Router>
    </ThemeProvider>
  );
};

export default App;
