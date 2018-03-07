import React from 'react';

import fetchDiscussions from '../../../../fetchers/discussions';
import fetchPosts from '../../../../fetchers/posts';
import ButtonForNew from './ButtonForNew';
import DataGrid from './Forum/DataGrid';

class Discussion extends React.Component {
  static Post = ({ body, posted, id }) => (
    <DataGrid.Item
      key={id}
      primary={body}
      captions={[`posted ${posted}`]}
    />
  )

  constructor(props) {
    super(props);
    this.discussion_id = props.match.params.id;
    this.slug = props.match.params.slug;
    this.state = props.location.state || {};
  }

  componentDidMount() {
    if (!this.state.discussion) this.getDiscussion();
  }

  setDiscussion = discussion => this.setState({ discussion })
  getDiscussion() {
    fetchDiscussions.get(this.slug, this.discussion_id).then(this.setDiscussion);
  }

  handleCreatePost = body => (
    fetchPosts.create(this.slug, this.discussion_id, body)
  )

  render() {
    const { discussion: { posts, topic } } = this.state;
    return (
      <div>
        <ButtonForNew
          title="New Post"
          resource="post"
          handleCreate={this.handleCreatePost}
        />
        <DataGrid title={`Thread: ${topic}`}>
          {posts.map(Discussion.Post)}
        </DataGrid>
      </div>
    );
  }
}

export default Discussion;
