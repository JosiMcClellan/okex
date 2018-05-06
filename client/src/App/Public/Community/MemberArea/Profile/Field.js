import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import ControlledTextField from '../../../Widgets/ControlledTextField';

class Field extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    prompt: PropTypes.string.isRequired,
    response: PropTypes.string,
    handleResponse: PropTypes.func.isRequired,
    setOpenField: PropTypes.func.isRequired,
    open: PropTypes.bool,
  }
  static defaultProps = { open: false, response: '' };

  ClosedResponse = () => (
    this.props.response &&
    <Typography variant="body1" data-cy="closed-profile-response">{this.props.response}</Typography>
  );

  OpenResponse = () => (
    <ControlledTextField
      fullWidth
      multiline
      initialValue={this.props.response || ''}
      handleSubmit={this.handleSubmit}
      data-cy="open-profile-response"
    />
  );

  handleSubmit = (value) => {
    const { id, handleResponse } = this.props;
    handleResponse(id, value);
  }

  handleClick = () => {
    const { id, setOpenField } = this.props;
    setOpenField(id);
  }

  render() {
    const { id, prompt, open } = this.props;
    const Response = open ? this.OpenResponse : this.ClosedResponse;
    return (
      <Paper onClick={this.handleClick} data-cy={`field-${id}`}>
        <Typography variant="body2" data-cy="profile-prompt">{prompt}</Typography>
        <Response />
      </Paper>
    );
  }
}

export default Field;
