import React from 'react';
import PropTypes from 'prop-types';

// import fetchDiscussions from '../../../../fetchers/discussions';
import ButtonForNew from './ButtonForNew';
import DataGrid from './Forum/DataGrid';

class Forum extends React.Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    handleCreateDiscussion: PropTypes.func.isRequired,
  }
  static defaultProps = {
    discussions: [],
  }

  Thread = (discussion) => {
    const {
      id, topic, started, active, posts,
    } = discussion;
    return (
      <DataGrid.Item
        key={id}
        primary={topic}
        captions={[
          `${posts.length} posts`,
          `started ${started}`,
          `active ${active}`,
        ]}
        to={{
          pathname: `/c/${this.props.slug}/thread/${id}`,
          state: { discussion },
        }}
      />
    );
  }

  render() {
    return (
      <div>
        <ButtonForNew
          title="Start a Thread"
          resource="thread"
          handleCreate={this.props.handleNewTopic}
        />
        <DataGrid title="All Threads">
          {this.props.discussions.map(this.Thread)}
        </DataGrid>
      </div>
    );
  }
}

export default Forum;
