import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import ArticleDetail from './ArticleDetail';

const Routes = () => {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/article/:id">
          <ArticleDetail />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
