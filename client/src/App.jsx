import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Public from './App/Public';

const App = () => (
  <MuiThemeProvider>
    <Router>
      <Switch>
        <Route path="/admin" component={() => 'Admin NYI'} />
        <Route component={Public} />
      </Switch>
    </Router>
  </MuiThemeProvider>
);

export default App;
