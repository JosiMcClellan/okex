import React from 'react';
import PropTypes from 'prop-types';
import DataGrid from './DataGrid';

const Post = ({ body, posted, id }) => (
  <DataGrid.Item
    key={id}
    primary={body}
    captions={[`posted ${posted}`]}
  />
);
Post.propTypes = {
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  posted: PropTypes.string.isRequired,
};
export default Post;
