import React from 'react';
import PropTypes from 'prop-types';
import DataGrid from './Forum/DataGrid';

import DiscussionsFetcher from '../../../../fetchers/DiscussionsFetcher';
import Preview from './Forum/ThreadPreview';

class Forum extends React.Component {
  static propTypes = { slug: PropTypes.string.isRequired }

  constructor(props) {
    super(props);
    this.state = { discussions: [] };
    this.discussionsFetcher = new DiscussionsFetcher(props.slug);
  }

  componentDidMount() {
    this.discussionsFetcher.index()
      .then(discussions => this.setState({ discussions }));
  }

  createDiscussion = async(topic) => {
    if (!topic) return;
    const { error, ...created } = await this.discussionsFetcher.create(topic)
      || { error: 'undefined resolution' };
    if (error) return console.log(`discussion create error: ${error}`);
    this.state.discussions.unshift(created);
    this.forceUpdate();
  }

  render() {
    const { props: { slug }, state: { discussions } } = this;
    return (
      <div>
        <DataGrid title="All Threads" newLabel="New Thread" handleSubmit={this.createDiscussion}>
          {discussions.map(({ id, ...rest }) => <Preview key={id} {...{ slug, id, ...rest }} />)}
        </DataGrid>
      </div>
    );
  }
}

export default Forum;
