import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

import AccountFetcher from '../fetchers/AccountFetcher';
import localAccount from './localAccount';
import PropsRoute from './PropsRoute';

import PublicThemeProvider from './Public/PublicThemeProvider';
import GoogleLoginButton from './Public/GoogleLoginButton';
import AccountMenu from './Public/AccountMenu';
import CommunityIndex from './Public/CommunityIndex';
import Community from './Public/Community';
import Settings from './Public/Settings';

import About from './Public/StaticPages/About';
import HelloWorld from './Public/StaticPages/HelloWorld';
import HomePage from './Public/StaticPages/HomePage';
import Josi from './Public/StaticPages/Josi';
import NotFound from './Public/StaticPages/NotFound';
import Terms from './Public/StaticPages/Terms';

class Public extends React.Component {
  constructor(props) {
    super(props);
    this.state = { account: localAccount.load() };
    this.accountFetcher = new AccountFetcher();
  }

  handleLogin = ({ code }) => {
    this.accountFetcher.create(code).then(this.saveAccount);
  }

  handleLogout = () => {
    localAccount.destroy();
    this.setState({ account: null });
  }

  saveAccount = (account) => {
    localAccount.save(account);
    this.setState({ account });
  }

  AccountSection = ({ account }) => {
    const { handleLogout, handleLogin } = this;
    if (!account) return <GoogleLoginButton {...{ handleLogin }} />;
    return <AccountMenu {...{ account, handleLogout }} />;
  }

  render() {
    const { account } = this.state;
    return (
      <PublicThemeProvider>
        <div className="public">
          <header>
            <Toolbar position="sticky">
              <LinkContainer to="/" className="brand">
                <Button>
                  <Typography variant="display4">OKX</Typography>
                </Button>
              </LinkContainer>
              <this.AccountSection {...{ account }} />
              <LinkContainer to="/c">
                <Button>Communities</Button>
              </LinkContainer>
            </Toolbar>
          </header>
          <main>
            <Paper className="big">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/terms" component={Terms} />
                <Route exact path="/about" component={About} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/hello_world" component={HelloWorld} />
                <Route exact path="/josi" component={Josi} />
                <Route exact path="/c" component={CommunityIndex} />
                <PropsRoute path="/c/:slug" Component={Community} props={{ account }} />
                <Route component={NotFound} />
              </Switch>
            </Paper>
          </main>
          <footer>
            <Toolbar>
              <LinkContainer to="/josi">
                <Button>
                  <Typography variant="headline">©2018 Josi McClellan</Typography>
                </Button>
              </LinkContainer>
              <LinkContainer to="/terms"><Button>Terms</Button></LinkContainer>
              <LinkContainer to="/about"><Button>About</Button></LinkContainer>
              <LinkContainer to="/hello_world"><Button>Hello World</Button></LinkContainer>
            </Toolbar>
          </footer>
        </div>
      </PublicThemeProvider>
    );
  }
}
export default Public;
