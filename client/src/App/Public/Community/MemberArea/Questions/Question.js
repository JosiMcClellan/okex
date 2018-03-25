import React from 'react';
import Collapse from 'material-ui/transitions/Collapse';
import { questionShape, func } from '../../../propShapes';
import ControlledTextField from '../../../Widgets/ControlledTextField';
import { H3, Caption } from '../../../Widgets/Text';

class Question extends React.Component {
  static propTypes = {
    handleResponse: func.isRequired,
    ...questionShape,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const updates = {};
    Array.from(event.target.elements).forEach((el) => {
      if (el.name) { updates[el.name] = el.value; }
    });
    this.props.handleResponse(updates);
  }

  patchHandler = name => (
    value => value && this.props.handleResponse(this.props.id, { [name]: value })
  )

  After = () => {
    const [color, word] = this.props.answer ? ['green', 'answered'] : ['red', 'unanswered'];
    return <span style={{ color, fontSize: '0.8em', float: 'right' }}> {word}</span>;
  }

  Field = props => (
    <ControlledTextField
      handleSubmit={this.patchHandler(props.name)}
      autoFocus={false}
      width="80%"
      type="number"
      buttons="none"
      {...props}
    />
  )

  render() {
    const {
      id,
      prompt,
      answer,
      ideal,
      weight,
      explanation,
      open,
      setOpenField,
      closeField,
    } = this.props;

    const Header = open ? H3 : Caption;
    const onClick = open ? closeField : () => { setOpenField(id); };
    // const color = answer ? 'default' : 'error';

    return (
      <form onSubmit={this.handleSubmit} >
        <Header {...{ onClick }} style={{ borderBottom: '1px solid white' }}>{prompt}<this.After /></Header>
        <Collapse in={open} timeout={500}>
          <this.Field name="answer" label="My number (0 - 10)" initialValue={answer} />
          <this.Field name="weight" label="Importance (0 - 10)" initialValue={weight} />
          <this.Field name="ideal" label="Match's number (0 - 10)" initialValue={ideal} />
          <this.Field
            name="explanation"
            label="Explanation"
            initialValue={explanation}
            type="text"
            rows="4"
            multiline
          />
          <button type="submit">Submit</button>
        </Collapse>
      </form>
    );
  }
}

export default Question;
