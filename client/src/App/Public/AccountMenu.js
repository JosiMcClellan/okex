import React from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { LinkContainer } from 'react-router-bootstrap';
import { shape, func, accountShape } from './propShapes';

class AccountMenu extends React.Component {
  static propTypes = {
    handleLogout: func.isRequired,
    account: shape(accountShape).isRequired,
  }

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

  render() {
    const {
      state: { anchorEl },
      props: { account, handleLogout },
      handleOpen, handleClose,
    } = this;

    return (
      <div>
        <Button
          onClick={handleOpen}
          aria-owns={anchorEl && 'login-dropdown'}
          aria-haspopup="true"
        >
          {account.email}&nbsp;&#9660;
        </Button>
        <Menu
          id="login-dropdown"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
        >
          <LinkContainer to="/settings"><MenuItem dense>Settings</MenuItem></LinkContainer>
          <LinkContainer to="/profiles"><MenuItem dense>My Profiles</MenuItem></LinkContainer>
          <MenuItem onClick={handleLogout} dense>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default AccountMenu;
