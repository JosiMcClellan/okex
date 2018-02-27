import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Menu from 'material-ui/Menu';
import { Link } from 'react-router-dom';

class AccountMenu extends React.Component {
  static propTypes = {
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
      props: { account },
      state: { anchorEl },
      handleOpen, handleClose, handleLogout,
    } = this;

    return (
      <div>
        <Button
          variant="raised"
          onClick={handleOpen}
          aria-owns={anchorEl && 'login-dropdown'}
          aria-haspopup="true"
        >
          {account.email}
        </Button>
        <Menu
          id="login-dropdown"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
        >
          <Link to="/settings">Settings</Link>
          <Link to="/profiles">My Profiles</Link>
          <Button onClick={handleLogout}>Logout</Button>
        </Menu>
      </div>
    );
  }
}

export default AccountMenu;
