import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
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
    this.handleCreate();
  }

  ButtonPaper = withStyles(theme => ({
    root: {
      marginLeft: '10%',
      marginRight: '10%',
      backgroundColor: theme.palette.action.A100,
      color: 'white',
      borderRadius: '0 0 100% 100%',
    },
  }))(Paper)

  render() {
    const {
      state: { open, value },
      props: { title, resource, children },
      handleCreate, handleChange, handleKeyPress,
      setOpen, setClosed,
    } = this;

    return (
      <this.ButtonPaper>
        <Button onClick={setOpen}>{title}</Button>
        <Dialog
          open={open}
          onClose={setClosed}
          aria-labelledby={`new-${resource}-form-title`}
          aria-describedby={`new-${resource}-form-text`}
        >
          <DialogTitle id={`new-${resource}-form-title`}>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id={`new-${resource}-form-text`}>
              {children}
            </DialogContentText>
            <TextField
              id="topic"
              label="Topic"
              type="text"
              margin="dense"
              autoFocus
              fullWidth
              value={value}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={setClosed} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreate} color="secondary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </this.ButtonPaper>
    );
  }
}

export default ButtonForNew;
