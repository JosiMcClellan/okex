import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styleContainer = withStyles(theme => ({
  root: {
    // color: theme.palette.error.A400,
  },
}));

const SubmitButton = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.action.A200,
  },
}))(Button);

const CancelButton = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.error.A200,
  },
}))(Button);

const TextArea = withStyles(theme => ({
  root: {
    color: theme.palette.error.A700,
  },
}))(TextField);

class ControlledTextField extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValue: PropTypes.string,
  };
  static defaultProps = { initialValue: '' }

  constructor(props) {
    super(props);
    this.state = { value: props.initialValue };
  }

  submit = (event) => {
    event.stopPropagation();
    this.props.handleSubmit(this.state.value);
  };

  cancel = (event) => {
    event.stopPropagation();
    this.props.handleSubmit(false);
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.submit(event);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.cancel(event);
    }
  }

  render() {
    const {
      props: { initialValue, handleSubmit, ...childProps },
      state: { value },
      handleChange: onChange,
      handleKeyDown: onKeyDown,
      cancel, submit,
    } = this;

    return (
      <div>
        <TextArea
          autoFocus
          {...{
            value,
            onChange,
            onKeyDown,
            ...childProps,
          }}
        />
        <CancelButton variant="fab" mini onClick={cancel}>x</CancelButton>
        <SubmitButton variant="fab" mini onClick={submit}>✔</SubmitButton>
      </div>
    );
  }
}

export default styleContainer(ControlledTextField);
