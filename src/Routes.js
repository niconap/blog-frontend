import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import ArticleDetail from './ArticleDetail';

const Routes = () => {
  return (
    <Router>
      <nav>
        <h1>
          <Link className="pagetitle" to="/blog-frontend">
            Nico's blog
          </Link>
        </h1>
      </nav>
      <Switch>
        <Route path="/blog-frontend" exact>
          <Home />
        </Route>
        <Route path="/blog-frontend/article/:id">
          <ArticleDetail />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
