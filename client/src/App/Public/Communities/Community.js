import React from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

import DashboardIcon from 'material-ui-icons/Home';
import ProfileIcon from 'material-ui-icons/Face';
import MessagesIcon from 'material-ui-icons/QuestionAnswer';
import QuestionsIcon from 'material-ui-icons/AssignmentTurnedIn';
import MatchesIcon from 'material-ui-icons/Star';
import ForumIcon from 'material-ui-icons/AccountBalance';
import SettingsIcon from 'material-ui-icons/Settings';

import fetchPreview from '../../../fetchers/communities/preview';
// import fetchFull from '../../../fetchers/communities/full';

class Community extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.state = { preview: props.location.state };
  }

  componentDidMount() {
    fetchPreview(this.id).then(preview => this.setState({ preview }));
  }

  render() {
    const { preview } = this.state;
    if (!preview) return 'Loading';
    return (
      <Paper color="primary">
        <Paper>
          <h1>{preview.name}</h1>
          <p>{preview.description}</p>
        </Paper>
        <Tabs centered>
          <Tab
            label="Dashboard"
            icon={<DashboardIcon />}
          >
            <Paper>Your Dashboard!  Yay!</Paper>
          </Tab>
          <Tab
            label="Profile"
            icon={<ProfileIcon />}
          >
            <Paper>Your Profile!  Yay!</Paper>
          </Tab>
          <Tab
            label="Messages"
            icon={<MessagesIcon />}
          >
            <Paper>Your Messages!  Yay!</Paper>
          </Tab>
          <Tab
            label="Matches"
            icon={<MatchesIcon />}
          >
            <Paper>Your Matches!  Yay!</Paper>
          </Tab>
          <Tab
            label="Questions"
            icon={<QuestionsIcon />}
          >
            <Paper>Some Questions to Answer!  Yay!</Paper>
          </Tab>
          <Tab
            label="Forum"
            icon={<ForumIcon />}
          >
            <Paper>The Forum!  Yay!</Paper>
          </Tab>
          <Tab
            label="Settings"
            icon={<SettingsIcon />}
          >
            <Paper>Your Settings!  Yay!</Paper>
          </Tab>
        </Tabs>
      </Paper>
    );
  }
}

export default Community;
