import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Tabs, { Tab } from 'material-ui/Tabs';

// import DashboardIcon from 'material-ui-icons/Home';
import ProfileIcon from 'material-ui-icons/Face';
// import MessagesIcon from 'material-ui-icons/QuestionAnswer';
import QuestionsIcon from 'material-ui-icons/AssignmentTurnedIn';
import MatchesIcon from 'material-ui-icons/Star';
import ForumIcon from 'material-ui-icons/AccountBalance';
// import SettingsIcon from 'material-ui-icons/Settings';

import Banner from './Banner';
import Forum from './MemberArea/Forum';
import Profile from './MemberArea/Profile';
import Discussion from '../Community/MemberArea/Discussion';
import Questions from '../Community/MemberArea/Questions';
import { shape, communityShape, profileShape } from '../propShapes';

class MemberArea extends React.Component {
  static propTypes = {
    community: shape(communityShape).isRequired,
    profile: shape(profileShape).isRequired,
  };

  static tabs = [
    // ['Dashboard', DashboardIcon],
    ['Profile', ProfileIcon],
    // ['Messages', MessagesIcon],
    ['Matches', MatchesIcon],
    ['Questions', QuestionsIcon],
    ['Forum', ForumIcon],
    // ['Settings', SettingsIcon],
  ]

  constructor(props) {
    super(props);
    this.state = { tab: 'Profile' };
    this.slug = props.community.slug;
  }

  OpenTab = () => {
    const {
      slug, handleCreateTopic,
      state: { tab, discussions },
      props: { profile },
    } = this;

    switch (tab) {
      case 'Forum': return <Forum {...{ slug, discussions, handleCreateTopic }} />;
      case 'Profile': return <Profile {...{ slug, ...profile }} />;
      case 'Questions': return <Questions {...{ slug, questions: profile.questions }} />;
      default: return `It's your ${tab}!  Yay!`;
    }
  }

  handleChange = (event, tab) => {
    this.setState({ tab });
  };

  render() {
    return (
      <div>
        <LinkContainer to={`/c/${this.slug}`}>
          <Banner>
            <Tabs centered value={this.state.tab} onChange={this.handleChange}>
              {MemberArea.tabs.map(([name, Icon]) => (
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
