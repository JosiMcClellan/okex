import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import profileFetcher from '../../../../fetchers/profile';

const Join = ({ slug, token, onJoin }) => {
  const handleClick = () => {
    profileFetcher.create(slug, token).then(onJoin);
  };
  return <Button onClick={handleClick}>Join</Button>;
};
Join.propTypes = {
  slug: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  onJoin: PropTypes.func.isRequired,
};

export default Join;
