import React from 'react';
import List, {
  ListItem,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import discussionFetcher from '../../../../fetchers/discussions';

class Discussion extends React.Component {
  static Post = ({ body, postedAt }) => (
    <ListItem>
      <ListItemText primary={body} secondary={`Posted: ${postedAt}`} />
    </ListItem>
  )

  constructor(props) {
    throw('shit');
    super(props);
    this.id = props.location.id;
    this.state = { discussion: props.location.state };
    this.state.discussion.posts = [];
  }

  componentDidMount() {
    discussionFetcher.get(this.id).then(discussion => this.setState({ discussion }));
  }

  render() {
    const { discussion: { posts, topic } } = this.state;
    return (
      <List subheader={<ListSubheader>{ topic }</ListSubheader>}>
        {posts.map(Discussion.Post)}
      </List>
    );
  }
}

export default Discussion;
