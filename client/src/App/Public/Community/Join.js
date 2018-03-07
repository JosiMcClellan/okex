import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

import fetchProfile from '../../../fetchers/profile';

const Join = ({ slug, onJoin }) => {
  const handleClick = () => {
    fetchProfile.create(slug).then(onJoin);
  };
  return (
    <Button variant="raised" onClick={handleClick}>Join</Button>
  );
};
Join.propTypes = {
  slug: PropTypes.string.isRequired,
  onJoin: PropTypes.func.isRequired,
};

export default Join;
