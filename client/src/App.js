import React from 'react';
import Reboot from 'material-ui/Reboot';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Public from './App/Public';
import Admin from './App/Admin';
import HelloWorld from './App/HelloWorld';

const App = () => (
  <Reboot>
    <Router>
      <Switch>
        <Route exact path="/hello_world" component={HelloWorld} />
        <Route path="/admin" component={Admin} />
        <Route component={Public} />
      </Switch>
    </Router>
  </Reboot>
);

export default App;
