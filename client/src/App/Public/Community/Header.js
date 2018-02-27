import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

const CommunityHeader = ({ community }) => (
  <Paper>
    <Typography variant="display3">{community.name}</Typography>
    <p>{community.description}</p>
  </Paper>
);
CommunityHeader.propTypes = {
  community: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommunityHeader;
