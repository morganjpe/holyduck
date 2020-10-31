import React from 'react';
import {ThemeProvider} from 'emotion-theming';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import {theme} from './theme';

import Menu from './pages/Menu';
import Orders from './pages/Orders';

const App = () => {
  return(
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}

export default App;