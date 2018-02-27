import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Public from './App/Public';
import Admin from './App/Admin';

const App = () => (
  <Router>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route component={Public} />
    </Switch>
  </Router>
);

export default App;
