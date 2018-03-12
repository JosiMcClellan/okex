import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import BreakpointVersions from '../Widgets/BreakpointVersions';


const CommunityHeader = ({ community: { name, description } }) => (
  <div>
    <BreakpointVersions
      Component={Typography}
      children={name}
      breaks={[
        [{               smUp: true },  { key: 'xshea', variant: 'title'    }],
        [{ xsDown: true, mdUp: true },  { key: 'smhea', variant: 'display2' }],
        [{ smDown: true },              { key: 'mdhea', variant: 'display3' }],
      ]}
    />

    <Typography variant="caption" style={{ width: '80%', margin: 'auto' }}>{description}</Typography>
  </div>
);
CommunityHeader.propTypes = {
  community: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommunityHeader;
