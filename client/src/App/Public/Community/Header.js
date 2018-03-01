import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

const CommunityHeader = ({ community }) => (
  <div>
    <Typography variant="display3">{community.name}</Typography>
    <Typography variant="caption">{community.description}</Typography>
  </div>
);
CommunityHeader.propTypes = {
  community: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommunityHeader;
