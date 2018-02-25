import React from 'react';
import Reboot from 'material-ui/Reboot';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Public from './App/Public';
import HelloWorld from './App/HelloWorld';

const App = () => (
  <Reboot>
    <Router>
      <Switch>
        <Route path="/admin" component={() => 'Admin'} />
        <Route exact path="/hello_world" component={HelloWorld} />
        <Route component={Public} />
      </Switch>
    </Router>
  </Reboot>
);

export default App;
