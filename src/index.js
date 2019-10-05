import React from 'react';
import ReactDOM from 'react-dom';
import Notebook from './components/Notebook';
import Login from './components/Login';
import NotFound from './components/NotFound'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import './index.css';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/notebook" component={Notebook} />
      <Route path="/not-found" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);
