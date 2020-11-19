import React from "react";
import { ThemeProvider } from "emotion-theming";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import scriptLoader from "react-async-script-loader";

// theme
import { theme } from "./theme";

// pages
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Confirmation from "./pages/Confirmation";
import Management from "./pages/Management";
import Login from "./components/Login";
import Appointments from "./pages/Appointments";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/appointments">
            <Appointments />
          </Route>
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
      </Router>
    </ThemeProvider>
  );
};

// pre load paypal before checkout is mounted
export default scriptLoader(
  "https://www.paypal.com/sdk/js?currency=GBP&client-id=Ab6oJnSdECyPV05wRy68D3-5hFcP-lYaNPQeY_JsSrvm0k53x5TXx_9-9BMAWFFAj5ZPoiGh2MkZHDpc"
)(App);
