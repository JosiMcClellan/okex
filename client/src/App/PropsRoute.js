import React from 'react';
import { Route } from 'react-router-dom';

const PropsRoute = ({ Component, props, ...spread }) => (
  <Route {...spread} render={fromRoute => <Component {...props} {...fromRoute} />} />
);

export default PropsRoute;
