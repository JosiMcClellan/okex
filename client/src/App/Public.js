import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';

import PublicThemeProvider from './Public/PublicThemeProvider';
import GoogleLoginButton from './Public/GoogleLoginButton';
import AccountMenu from './Public/AccountMenu';
import CommunityIndex from './Public/CommunityIndex';
import Community from './Public/Community';
import Settings from './Public/Settings';
import PropsRoute from './PropsRoute';
import accountFetcher from '../fetchers/account';
import localAccount from './localAccount';

import HelloWorld from './Public/HelloWorld';
import Terms from './Public/Terms';
import About from './Public/About';
import Josi from './Public/Josi';
import NotFound from './Public/NotFound';

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
    if (!account) return <GoogleLoginButton {...{ handleLogin }} />;
    return <AccountMenu {...{ account, handleLogout }} />;
  }

  render() {
    const { account } = this.state;
    return (
      <PublicThemeProvider>
        <div className="public">

          <header>
            <AppBar position="sticky">
              <Toolbar>
                <LinkContainer to="/" className="brand">
                  <Button>
                    <Typography variant="display4"><Icon>O</Icon></Typography>
                    <Typography variant="display4"><Icon>K</Icon></Typography>
                    <Typography variant="display4"><Icon>X</Icon></Typography>
                  </Button>
                </LinkContainer>
                <this.AccountSection />
                <LinkContainer to="/c"><Button>Communities</Button></LinkContainer>
              </Toolbar>
            </AppBar>
          </header>

          <main>
            <Paper className="big">
              <Switch>
                <Route exact path="/" render={() => 'Home Page'} />
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
              <Typography variant="headline">©2018 Josi McClellan</Typography>
              <LinkContainer to="/terms"><Button>Terms</Button></LinkContainer>
              <LinkContainer to="/about"><Button>About</Button></LinkContainer>
              <LinkContainer to="/hello_world"><Button>Hello World</Button></LinkContainer>
              <LinkContainer to="/josi"><Button>Josi</Button></LinkContainer>
            </Toolbar>
          </footer>

        </div>
      </PublicThemeProvider>

    );
  }
}
export default Public;
