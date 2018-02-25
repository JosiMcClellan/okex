import React from 'react';
import Button from 'material-ui/Button';
import Menu from 'material-ui/Menu';
import GoogleLoginButton from './AccountMenu/GoogleLoginButton';

class AccountMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }

  handleOpen = (event) => {
    event.preventDefault();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  // handleGoogleSuccess = () => {
  //   this.
  // }

  render() {
    const {
      props: { account },
      state: { anchorEl },
      handleOpen, handleClose,
    } = this;

    return (
      <div>
        <Button
          variant="raised"
          onClick={handleOpen}
          aria-owns={anchorEl && 'login-dropdown'}
          aria-haspopup="true"
        >
          Login
        </Button>
        <Menu
          id="login-dropdown"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
        >
          <GoogleLoginButton />
        </Menu>
      </div>
    );
  }
}

export default AccountMenu;
