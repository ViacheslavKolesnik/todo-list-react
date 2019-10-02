import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from './components/Login';
import NotFound from './components/NotFound'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './libs/material/material.min.css';
import './libs/material/material.min.js';
import './index.css';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/notebook/:user" component={App} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);
