import React from 'react';

import DiscussionsFetcher from '../../../../fetchers/DiscussionsFetcher';
import PostsFetcher from '../../../../fetchers/PostsFetcher';
import DataGrid from './Forum/DataGrid';
import Post from './Forum/Post';

class Discussion extends React.Component {
  constructor(props) {
    super(props);
    const { slug, id } = props.match.params;
    this.discussionsFetcher = new DiscussionsFetcher(slug);
    this.postsFetcher = new PostsFetcher(slug, id);
    this.state = props.location.state || { posts: [], topic: null };
  }

  componentDidMount() {
    if (this.state.topic) return;
    this.discussionsFetcher.get(this.props.match.params.id)
      .then(({ topic, posts }) => this.setState({ topic, posts }));
  }

  createPost = (body) => {
    this.postsFetcher.create(body).then(this.displayCreatedPost);
  }

  displayCreatedPost = (post) => {
    this.setState(({ posts }) => ({ posts: [...posts, post] }));
  }

  render() {
    const { posts, topic } = this.state;
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
