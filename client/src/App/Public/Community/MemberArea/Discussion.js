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
    super(props);
    this.id = props.match.params.id;
    const discussion = Object.assign({ posts: [] }, props.location.state);
    this.state = { discussion };
  }

  componentDidMount() {
    this.getDiscussion();
  }

  getDiscussion() {
    const { id } = this.props.match.params;
    discussionFetcher.get(id).then(discussion => this.setState({ discussion }));
  }

  render() {
    console.log(this);
    const { discussion: { posts, topic } } = this.state;
    return (
      <List subheader={<ListSubheader>{ topic }</ListSubheader>}>
        {posts.map(Discussion.Post)}
      </List>
    );
  }
}

export default Discussion;
