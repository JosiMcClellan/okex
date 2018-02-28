import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Tabs, { Tab } from 'material-ui/Tabs';

import DashboardIcon from 'material-ui-icons/Home';
import ProfileIcon from 'material-ui-icons/Face';
import MessagesIcon from 'material-ui-icons/QuestionAnswer';
import QuestionsIcon from 'material-ui-icons/AssignmentTurnedIn';
import MatchesIcon from 'material-ui-icons/Star';
import ForumIcon from 'material-ui-icons/AccountBalance';
import SettingsIcon from 'material-ui-icons/Settings';

import Forum from './MemberArea/Forum';
import Discussion from '../Community/MemberArea/Discussion';
import fetchDiscussons from '../../../fetchers/discussions';

class MemberArea extends React.Component {
  static propTypes = {
    community: PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { discussions: [], value: 'Dashboard' };
  }

  componentDidMount() {
    const { slug } = this.props.community;
    fetchDiscussons.index(slug).then(discussions => this.setState({ discussions }));
  }

  OpenTab = () => {
    const { value, discussions } = this.state;
    const { slug } = this.props.community;
    switch (value) {
      case 'Forum': return <Forum {...{ discussions, slug }} />;
      default: return `It's your ${value}!  Yay!`;
    }
  }

  tabs = [
    ['Dashboard', DashboardIcon],
    ['Profile', ProfileIcon],
    ['Messages', MessagesIcon],
    ['Matches', MatchesIcon],
    ['Questions', QuestionsIcon],
    ['Forum', ForumIcon],
    ['Settings', SettingsIcon],
  ]

  handleChange = (e, value) => {
    this.setState({ value });
  };

  render() {
    const { slug } = this.props.community;
    return (
      <div>
        <LinkContainer to={`/c/${slug}`}>
          <Tabs centered value={this.state.value} onChange={this.handleChange}>
            {this.tabs.map(([name, Icon]) => (
              <Tab key={name} label={name} value={name} icon={<Icon />} />
            ))}
          </Tabs>
        </LinkContainer>
        <Switch>
          <Route path="/c/:slug/thread/:id" component={Discussion} />
          <Route component={this.OpenTab} />
        </Switch>
      </div>
    );
  }
}

export default MemberArea;
