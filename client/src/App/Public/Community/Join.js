import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import profileFetcher from '../../../fetchers/profile';

const Join = ({ slug, onJoin }) => {
  const handleClick = () => {
    profileFetcher.create(slug).then(onJoin);
  };
  return <Button onClick={handleClick}>Join</Button>;
};
Join.propTypes = {
  slug: PropTypes.string.isRequired,
  onJoin: PropTypes.func.isRequired,
};

export default Join;
