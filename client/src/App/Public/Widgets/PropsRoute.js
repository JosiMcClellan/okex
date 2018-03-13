import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const PropsRoute = ({ Component, props, ...spread }) => (
  <Route {...spread} render={fromRoute => <Component {...props} {...fromRoute} />} />
);
PropsRoute.propTypes = {
  Component: PropTypes.func.isRequired,
  props: PropTypes.object.isRequired,
};

export default PropsRoute;
