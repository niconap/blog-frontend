import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import App from './App';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <App message="Hello world!" />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
