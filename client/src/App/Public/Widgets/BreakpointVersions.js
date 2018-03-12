import React from 'react';
import PropTypes from 'prop-types';
import Hidden from 'material-ui/Hidden';

const BreakpointVersions = ({
  Component, breaks, children, ...props
}) => (
  breaks.map(([hides, { key, ...breakProps }]) => (
    <Hidden {...hides} key={key}>
      <Component {...{ children, ...props, ...breakProps }} />
    </Hidden>
  ))
);
BreakpointVersions.propTypes = {
  Component: PropTypes.func.isRequired,
  breaks: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default BreakpointVersions;
