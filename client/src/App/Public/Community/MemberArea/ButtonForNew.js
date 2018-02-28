import React from 'react';
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
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: '',
    };
  }

  setOpen = () => {
    this.setState({ open: true });
  };

  setClosed = () => {
    this.setState({ open: false });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleCreate = () => {
    this.props.handleCreate(this.state.value);
    this.setState({ open: false, value: '' });
  }

  handleKeyPress = (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    this.handleCreate();
  }

  NewButtonPaper = withStyles(theme => ({
    root: {
      marginLeft: '10%',
      marginRight: '10%',
      backgroundColor: theme.palette.action.A100, // [50],
      color: 'white',
      borderRadius: '0 0 100% 100%',
    },
  }))(Paper)

  render() {
    const {
      state: { open, value },
      props: { title, resource, children },
      setOpen, setClosed,
      handleCreate, handleChange, handleKeyPress,
    } = this;

    return (
      <this.NewButtonPaper>
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
      </this.NewButtonPaper>
    );
  }
}

export default ButtonForNew;
