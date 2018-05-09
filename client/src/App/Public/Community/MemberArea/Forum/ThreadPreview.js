import React from 'react';
import PropTypes from 'prop-types';
import DataGrid from './DataGrid';

class ThreadPreview extends React.Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    topic: PropTypes.string.isRequired,
    started: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
    })).isRequired,
  }

  render() {
    const {
      slug, id, topic, started, active, posts,
    } = this.props;
    return (
      <DataGrid.Item
        primary={topic}
        captions={[
          `${posts.length} posts`,
          `started ${started}`,
          `active ${active}`,
        ]}
        to={{
          pathname: `/c/${slug}/thread/${id}`,
          state: { topic, posts },
        }}
      />
    );
  }
}

export default ThreadPreview;
