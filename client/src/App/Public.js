import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

import PublicThemeProvider from './Public/PublicThemeProvider';
import GoogleLoginButton from './Public/GoogleLoginButton';
import AccountMenu from './Public/AccountMenu';
import CommunityIndex from './Public/CommunityIndex';
import Community from './Public/Community';
import PropsRoute from './PropsRoute';
import accountFetcher from '../fetchers/account';
import localAccount from './localAccount';

class Public extends React.Component {
  constructor(props) {
    super(props);
    this.state = { account: localAccount.load() };
  }

  handleLogin = ({ code }) => {
    accountFetcher.create(code)
      .then(this.saveAccount);
  }

  handleLogout = () => {
    localAccount.destroy();
    this.setState({ account: null });
  }

  saveAccount = (account) => {
    localAccount.save(account);
    this.setState({ account });
  }

  AccountSection = () => {
    const { account } = this.state;
    const { handleLogout, handleLogin } = this;
    if (account) return <AccountMenu {...{ account, handleLogout }} />;
    return <GoogleLoginButton {...{ handleLogin }} />;
  }

  render() {
    const { account } = this.state;
    return (
      <PublicThemeProvider>

        <AppBar>
          <Toolbar>
            <LinkContainer to="/" className="brand">
              <IconButton disableRipple>
                <Icon>OKX</Icon>
              </IconButton>
            </LinkContainer>
            <NavLink to="/c">Communities</NavLink>
            <this.AccountSection />
          </Toolbar>
        </AppBar>

        <Paper>
          <Switch>
            <Route exact path="/" render={() => 'Home Page'} />
            <Route exact path="/terms" render={() => 'Terms'} />
            <Route exact path="/about" render={() => 'About'} />
            <Route exact path="/josi" render={() => 'Josi'} />
            <Route exact path="/c" component={CommunityIndex} />
            <PropsRoute path="/c/:slug" Component={Community} props={{ account }} />
            <Route render={() => 'Not Found'} />
          </Switch>
        </Paper>

        <Paper color="primary">
          <p>©2018 Josi McClellan</p>
          <NavLink exact to="/terms">Terms</NavLink>
          <NavLink exact to="/about">About</NavLink>
          <NavLink exact to="/josi">Josi</NavLink>
        </Paper>
      </PublicThemeProvider>

    );
  }
}

export default Public;
