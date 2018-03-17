import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';

import { idMap } from '../../../../utils';
import QuestionsFetcher from '../../../../fetchers/QuestionsFetcher';
import { questionShape, arrayOf, shape } from '../../propShapes';
import Question from './Questions/Question';
import { H2 } from '../../Widgets/Text';

class Questions extends React.Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    questions: arrayOf(shape(questionShape)),
  }
  static defaultProps = {
    questions: [],
  }

  constructor(props) {
    super(props);
    this.questionsFetcher = new QuestionsFetcher(props.slug);
    this.state = {
      questions: idMap(props.questions),
      openFieldId: null,
    };
  }

  componentDidMount() {
    // console.log(this);
    // this.questionsFetcher.index(this.props.slug).then(questions => this.setState({ questions }));
  }

  setOpenField = id => this.setState({ openFieldId: id });
  closeField = () => this.setOpenField(null);

  handleResponse = async(questionId, value) => {
    if (value === false) return this.closeField();

    const { id, error, ...updated }
      = await this.questionsFetcher.update(questionId, value)
      || { error: 'undefined resolution' };

    if (error) {
      console.log(`field update error: ${error}`);
      this.closeField();
    } else {
      this.state.questions.set(questionId, updated);
      this.state.openFieldId = null;
      this.forceUpdate();
    }
  }

  render() {
    const {
      handleResponse, setOpenField,
      state: { questions, openFieldId },
    } = this;

    return (
      <div>
        <H2>Questions</H2>
        <List>
          {Array.from(questions, ([id, field]) => (
            <Question
              key={id}
              open={id === openFieldId}
              {...{
                id,
                setOpenField,
                handleResponse,
                ...field,
              }}
            />
          ))}
        </List>
      </div>
    );
  }
}

export default Questions;
