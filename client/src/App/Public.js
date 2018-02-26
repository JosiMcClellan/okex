import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
// Material UI
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
// Local
import PublicThemeProvider from './Public/PublicThemeProvider';
import GoogleLoginButton from './Public/GoogleLoginButton';
import AccountMenu from './Public/AccountMenu';
import CommunityIndex from './Public/Communities/Index';
import Community from './Public/Communities/Community';
import fetchAccount from '../fetchers/accounts/create';
import PropsRoute from './PropsRoute';

class Public extends React.Component {
  constructor(props) {
    super(props);
    this.state = { account: null };
  }

  handleLogin = ({ code }) => {
    // this.setState({ account: 'pending' });
    fetchAccount(code).then(account => this.setState({ account }));
  }

  render() {
    const {
      state: { account },
      handleLogin,
    } = this;

    return (
      <PublicThemeProvider>

        <AppBar position="static">
          <LinkContainer to="/" className="brand">
            <IconButton
              style={{ fontsize: '150px' }}
              disableRipple
            >
              <Icon>OKX</Icon>
            </IconButton>
          </LinkContainer>
          <Toolbar>
            <NavLink to="/c">Communities</NavLink>
            {
              account
              ? <AccountMenu account={account} />
              : <GoogleLoginButton handleLogin={handleLogin} />
            }
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/" render={() => 'Home Page'} />
          <Route exact path="/terms" render={() => 'Terms'} />
          <Route exact path="/about" render={() => 'About'} />
          <Route exact path="/josi" render={() => 'Josi'} />
          <Route exact path="/c" component={CommunityIndex} />
          <PropsRoute path="/c/:slug" Component={Community} props={{ account }} />
          <Route render={() => 'Not Found'} />
        </Switch>

        <footer>
          <Paper color="primary">
            <p>©2018 Josi McClellan</p>
            <NavLink exact to="/terms">Terms</NavLink>
            <NavLink exact to="/about">About</NavLink>
            <NavLink exact to="/josi">Josi</NavLink>
          </Paper>
        </footer>

      </PublicThemeProvider>
    );
  }
}

export default Public;
