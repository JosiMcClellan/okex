import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';

class ButtonForNew extends React.Component {
  static propTypes = {
    handleCreate: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { open: false, value: '' };
  }

  setOpen = () => this.setState({ open: true })
  setClosed = () => this.setState({ open: false })

  handleChange = event => (
    this.setState({ value: event.target.value })
  )

  handleCreate = () => (
    this.props.handleCreate(this.state.value)
      .then(this.reset)
      .catch(console.log)
  )

  reset = () => this.setState({ open: false, value: '' });

  handleKeyPress = (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    this.handleCreate(this.state.value);
  }

  NewButton = withStyles(theme => ({
    root: {
      backgroundColor: theme.palette.action.A400,
      border: `1px solid ${theme.palette.action.A700}`,
      marginBottom: '2%',
      width: '90%',
    },
    label: {
      padding: '1em',
    },
  }))(Button)

  render() {
    const {
      state: { open, value },
      props: { title, resource },
      handleCreate, handleChange, handleKeyPress,
      setOpen, setClosed,
    } = this;

    return (
      <div>
        <this.NewButton variant="raised" onClick={setOpen}>{title}</this.NewButton>
        <Dialog
          open={open}
          onClose={setClosed}
          aria-labelledby={`new-${resource}-form-title`}
          aria-describedby={`new-${resource}-form-text`}
        >
          <DialogTitle id={`new-${resource}-form-title`}>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id={`new-${resource}-form-text`}>
              If you haven&#39;t yet, please read our <Link to="/terms">terms</Link>.
            </DialogContentText>
            <TextField
              id="topic"
              label="Topic"
              type="textarea"
              margin="dense"
              autoFocus
              fullWidth
              value={value}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={setClosed}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ButtonForNew;
