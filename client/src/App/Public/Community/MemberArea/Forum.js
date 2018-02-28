import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ButtonForNew from './ButtonForNew';

class Forum extends React.Component {
  static defaultProps = {
    discussions: [],
  }

  Thread = (data) => {
    const linkTo = {
      pathname: `/c/${this.props.slug}/thread/${data.id}`,
      state: { data },
    };
    return (
      <LinkContainer key={data.id} to={linkTo}>
        <ListItem>
          <ListItemText
            inset
            primary={data.topic}
            secondary={`Created: ${data.createdAt}, Active: ${data.activeAt}`}
          />
        </ListItem>
      </LinkContainer>
    );
  }

  render() {
    const { discussions } = this.props;
    return (
      <div>
        <ButtonForNew
          title="Start a Thread"
          resource="thread"
          handleCreate={console.log} // {this.handleCreateDiscussion}
        >
          Enter the topic below.  If you haven&#39;t yet, please read our <Link to="/terms">terms</Link>.
        </ButtonForNew>
        <List>
          {discussions.map(this.Thread)}
        </List>
      </div>
    );
  }
}

export default Forum;
