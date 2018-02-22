import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import HelloWorld from './Public/HelloWorld';
import Popdown from './Public/Popdown';

const Public = () => (
  <div className="Public">

    <header>
      <AppBar title={<a href="/" className="brand">OKX</a>}>
        <NavLink to="/c">Communities</NavLink>
        <NavLink to="/c">Login</NavLink>
        <Popdown label="login">
          <MenuItem href="nowhere">Google</MenuItem>
        </Popdown>
      </AppBar>
    </header>

    <Switch>
      <Route exact path="/" render={() => 'Home Page'} />
      <Route exact path="/hello_world" component={HelloWorld} />
      <Route path="/c" component={() => 'Not Found'} />
      <Route render={() => 'Not Found'} />
    </Switch>

  </div>
);

export default Public;
