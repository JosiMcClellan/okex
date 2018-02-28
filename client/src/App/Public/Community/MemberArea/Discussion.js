import React from 'react';
import List, {
  ListItem,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import discussionFetcher from '../../../../fetchers/discussions';

class Discussion extends React.Component {
  static Post = ({ body, postedAt, id }) => (
    <ListItem key={id}>
      <ListItemText primary={body} secondary={`Posted: ${postedAt}`} />
    </ListItem>
  )

  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    const discussion = props.location.state.data;
    this.state = { discussion };
  }

  componentDidMount() {
    if (this.state.discussion) return;
    this.getDiscussion();
  }

  getDiscussion() {
    const { id, slug } = this.props.match.params;
    discussionFetcher.get(id, slug).then(discussion => this.setState({ discussion }));
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
