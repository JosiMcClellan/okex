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

import Banner from './Banner';
import Forum from './MemberArea/Forum';
import Discussion from '../Community/MemberArea/Discussion';
import fetchDiscussions from '../../../fetchers/discussions';

class MemberArea extends React.Component {
  static propTypes = {
    community: PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { discussions: [], tab: 'Dashboard' };
  }

  componentDidMount() {
    const { slug } = this.props.community;
    fetchDiscussions.index(slug).then(discussions => this.setState({ discussions }));
  }

  handleNewTopic = async (topic) => {
    console.log(this);
    const created = await fetchDiscussions.create(this.props.community.slug, topic);
    if (created.error) return console.log(`failed to create discussion: ${created.error}`);
    this.state.discussions.unshift(created);
    this.forceUpdate();
  }
  // addCreatedDiscussion = (created) => {
  //   this.forceUpdate();
  // }

  OpenTab = () => {
    const {
      handleNewTopic,
      state: { tab, discussions },
      props: { community: { slug } },
    } = this;
    switch (tab) {
      case 'Forum': return console.log(this) || console.log(slug) || <Forum {...{ handleNewTopic, discussions, slug }} />;
      default: return `It's your ${tab}!  Yay!`;
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

  handleChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { slug } = this.props.community;
    return (
      <div>
        <LinkContainer to={`/c/${slug}`}>
          <Banner>
            <Tabs centered value={this.state.tab} onChange={this.handleChange}>
              {this.tabs.map(([name, Icon]) => (
                <Tab key={name} label={name} value={name} icon={<Icon />} />
              ))}
            </Tabs>
          </Banner>
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
