import React from 'react';
import { Link } from 'react-router-dom';
import List, {
  ListItem,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import ButtonForNew from './ButtonForNew';
import fetchDiscussions from '../../../../fetchers/discussions';
// import fetchPosts from '../../../../fetchers/posts';

class Discussion extends React.Component {
  static Post = ({ body, posted, id }) => (
    <ListItem key={id}>
      <ListItemText inset primary={body} secondary={`posted ${posted}`} />
    </ListItem>
  )

  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.state = { discussion: props.location.state.data };
  }

  componentDidMount() {
    if (!this.state.discussion) this.getDiscussion();
  }

  setDiscussion = discussion => this.setState({ discussion })
  getDiscussion() {
    const { id, slug } = this.props.match.params;
    return fetchDiscussions.get(id, slug).then(this.setDiscussion);
  }

  render() {
    const { discussion: { posts, topic } } = this.state;
    return (
      <div>
        <ButtonForNew
          title="New Post"
          resource="post"
          handleCreate={console.log} // {this.handleCreatePost}
        >
          Enter the text below.  If you haven&#39;t yet, please read our <Link to="/terms">terms</Link>.
        </ButtonForNew>
        <List subheader={<ListSubheader>{topic}</ListSubheader>}>
          {posts.map(Discussion.Post)}
        </List>
      </div>
    );
  }
}

export default Discussion;
