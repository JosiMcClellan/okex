import React from 'react';
import { questionShape, func } from '../../../propShapes';
import ControlledTextField from '../../../Widgets/ControlledTextField';
import { H3 } from '../../../Widgets/Text';

// import withDefaults from '../../../hocs/withDefaults';
// const MyTextField = withDefaults(ControlledTextField, { handleSubmit });


const Field = props => <ControlledTextField width="80%" type="number" {...props} />;

const Question = ({
  handleSubmit,
  prompt,
  answer,
  ideal,
  weight,
  explanation,
}) => (
  <form>
    <H3>{prompt}</H3>
    {/* <Field type="number" label="answer" initialValue={answer} /> */}
    <Field label="My number (0 - 10)"
      initialValue={answer}
      {...{ handleSubmit }}
    />
    <Field label="Match's number (0 - 10)"
      initialValue={ideal}
      {...{ handleSubmit }}
    />
    <Field label="Importance (0 - 10)"
      initialValue={weight}
      {...{ handleSubmit }} />
    <Field label="Explanation"
      initialValue={explanation}
      type="text"
      rows="5"
      multiline
      {...{ handleSubmit }}
    />
  </form>
);

Question.propTypes = {
  handleSubmit: func.isRequired,
  ...questionShape,
};

export default Question;
