import React from 'react';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import DashboardIcon from 'material-ui-icons/Home';
import ProfileIcon from 'material-ui-icons/Face';
import MessagesIcon from 'material-ui-icons/QuestionAnswer';
import QuestionsIcon from 'material-ui-icons/AssignmentTurnedIn';
import MatchesIcon from 'material-ui-icons/Star';
import ForumIcon from 'material-ui-icons/AccountBalance';
import SettingsIcon from 'material-ui-icons/Settings';

class MemberArea extends React.Component {
  render() {
    return (
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
    );
  }
}

export default MemberArea;
