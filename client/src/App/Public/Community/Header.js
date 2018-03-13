import React from 'react';
import PropTypes from 'prop-types';
import { TextVariants } from '../Widgets/BreakProps';

const CommunityHeader = ({ community: { name, description } }) => (
  <div>
    <TextVariants
      keyBase="community-name"
      children={name}
      breaks={{
        xs: 'title',
        sm: 'display2',
        'md lg xl': 'display3',
      }}
    />
    <TextVariants
      keyBase="community-description"
      style={{ width: '80%', margin: 'auto' }}
      children={description}
      breaks={{
        xs: 'caption',
        sm: 'body1',
        'md lg': 'subheading',
        xl: 'title',
      }}
    />
  </div>
);
CommunityHeader.propTypes = {
  community: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommunityHeader;
