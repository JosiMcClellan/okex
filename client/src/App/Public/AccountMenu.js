import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Menu from 'material-ui/Menu';
import { LinkContainer } from 'react-router-bootstrap';

class AccountMenu extends React.Component {
  static propTypes = {
    handleLogout: PropTypes.func.isRequired,
    account: PropTypes.shape({
      token: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
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
          {account.email} &#9660;
        </Button>
        <Menu
          id="login-dropdown"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
        >
          <LinkContainer to="/settings"><Button variant="raised">Settings</Button></LinkContainer>
          <LinkContainer to="/profiles"><Button variant="raised">My Profiles</Button></LinkContainer>
          <Button onClick={handleLogout} variant="raised">Logout</Button>
        </Menu>
      </div>
    );
  }
}

export default AccountMenu;
