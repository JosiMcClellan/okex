import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import List, { ListItem, ListItemText } from 'material-ui/List';

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
            primary={data.topic}
            secondary={`Created: ${data.createdAt} Active: ${data.activeAt}`}
          />
        </ListItem>
      </LinkContainer>
    );
  }

  render() {
    const { discussions } = this.props;
    console.log(this);
    console.log(discussions);
    return (
      <div>
        <List>
          {discussions.map(this.Thread)}
        </List>
      </div>
    );
  }
}

export default Forum;
