import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

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

class ControlledTextField extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.string,
    buttons: PropTypes.oneOf(['left', 'right', 'none']),
    // rest spread to TextField
  };
  static defaultProps = {
    initialValue: '',
    buttons: 'right',
    width: '100%',
  }

  constructor(props) {
    super(props);
    this.state = { value: String(props.initialValue) };
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

  renderButtons = () => (
    <span style={{ display: 'flex' }}>
      <CancelButton variant="fab" mini onClick={this.cancel}>x</CancelButton>
      <SubmitButton variant="fab" mini onClick={this.submit}>✔</SubmitButton>
    </span>
  )

  render() {
    const {
      renderButtons,
      handleChange: onChange,
      handleKeyDown: onKeyDown,
      state: { value },
      props: {
        initialValue,
        handleSubmit,
        buttons,
        width,
        ...childProps
      },
    } = this;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {buttons === 'left' && renderButtons()}
        <TextField
          autoFocus
          {...{
            value,
            onChange,
            onKeyDown,
            ...childProps,
            style: { width },
          }}
        />
        {buttons === 'right' && renderButtons()}
      </div>
    );
  }
}

export default ControlledTextField;
