import React from 'react';

import DiscussionsFetcher from '../../../../fetchers/DiscussionsFetcher';
import PostsFetcher from '../../../../fetchers/PostsFetcher';
import DataGrid from './Forum/DataGrid';
import Post from './Forum/Post';

class Discussion extends React.Component {
  constructor(props) {
    super(props);
    const { slug, id } = props.match.params;
    this.id = id;
    this.discussionsFetcher = new DiscussionsFetcher(slug);
    this.postsFetcher = new PostsFetcher(slug, id);
    this.state = props.location.state || { discussion: null };
  }

  componentDidMount() {
    if (!this.state.discussion) this.getDiscussion();
  }

  setDiscussion = discussion => this.setState({ discussion })
  getDiscussion = () => this.discussionsFetcher.get(this.id)
    .then(this.setDiscussion);

  createPost = body => this.postsFetcher.create(body)

  render() {
    const { discussion: { posts, topic } } = this.state;
    return (
      <div>
        <DataGrid
          title={`Thread: ${topic}`}
          newLabel="New Post"
          handleSubmit={this.createPost}
        >
          {posts.map(Post)}
        </DataGrid>
      </div>
    );
  }
}

export default Discussion;
