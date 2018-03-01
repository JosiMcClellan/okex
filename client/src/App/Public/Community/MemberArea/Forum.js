import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ButtonForNew from './ButtonForNew';
import fetchDiscussions from '../../../../fetchers/discussions';

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
            // eslint-disable-next-line max-len
            secondary={<span>started {data.founded} -- <b>{data.posts.length} posts</b> -- active {data.active}</span>}
          />
        </ListItem>
      </LinkContainer>
    );
  }

  handleCreate = () => (
    fetchDiscussions.create(this.props.slug).then(this.reset)
  )

  render() {
    return (
      <div>
        <ButtonForNew
          title="Start a Thread"
          resource="thread"
          handleCreate={this.handleCreate}
        >
          Enter the topic below.  If you haven&#39;t yet, please read our <Link to="/terms">terms</Link>.
        </ButtonForNew>
        <List>
          {this.props.discussions.map(this.Thread)}
        </List>
      </div>
    );
  }
}

export default Forum;
