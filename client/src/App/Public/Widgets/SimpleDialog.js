import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import ControlledTextField from './ControlledTextField';

const OpenButton = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.action.A400,
    border: `1px solid ${theme.palette.action.A700}`,
    marginBottom: '2%',
    width: '80%',
  },
  label: {
    padding: '1em',
  },
}))(Button);

class SimpleDialog extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }
  static Button = ({ label, setOpen }) => (
    <OpenButton variant="raised" onClick={setOpen}>
      {label}
    </OpenButton>
  )
  static Title = ({ label }) => (
    <DialogTitle id={`${label}-dialog-title`}>
      {label}
    </DialogTitle>
  )
  static Content = props => (
    <DialogContent>
      <DialogContentText id={`${props.label}-dialog-text`}>
        If you haven&#39;t yet, please read our <Link to="/terms">terms</Link>.
      </DialogContentText>
      <ControlledTextField multiline fullWidth autoFocus {...props} />
    </DialogContent>
  )

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  setOpen = () => this.setState({ open: true })
  setClosed = () => this.setState({ open: false })

  handleSubmit = (value) => {
    this.setClosed();
    if (value === false) return;
    this.props.handleSubmit(value);
  }

  render() {
    const {
      state: { open },
      props: { label },
      handleSubmit, setOpen, setClosed,
    } = this;

    return (
      <div>
        <SimpleDialog.Button {...{ label, setOpen }} />
        <Dialog
          aria-labelledby={`${label}-dialog-title`}
          aria-describedby={`${label}-dialog-text`}
          onClose={setClosed}
          {...{ open }}
        >
          <SimpleDialog.Title {...{ label }} />
          <SimpleDialog.Content {...{ label, handleSubmit }} />
        </Dialog>
      </div>
    );
  }
}

export default SimpleDialog;
