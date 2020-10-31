import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Menu from './pages/Menu';
import Orders from './pages/Orders';

const App = () => {
  return(
    <Router>
      <Switch>
        <Route path="/orders">
          <Orders />
        </Route>
        <Route path="/">
          <Menu />
        </Route>
      </Switch>

    </Router>
  )
}

export default App;