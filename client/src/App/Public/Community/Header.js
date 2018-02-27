import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

const CommunityHeader = ({ community }) => (
  <Paper color="primary">
    <Paper>
      <h1>{community.name}</h1>
      <p>{community.description}</p>
    </Paper>
  </Paper>
);
CommunityHeader.propTypes = {
  community: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommunityHeader;
