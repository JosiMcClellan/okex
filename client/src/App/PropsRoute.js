import React from 'react';
import { Route } from 'react-router-dom';

const PropsRoute = ({ Component, props, ...spread }) => (
  <Route {...spread} render={fromRoute => <Component {...props} {...fromRoute} />} />
);

// const PropsRoute = ({
//   Component,
//   props,
//   ...spreadToRoute
// }) => {
//   const withProps = propsFromRouter => (
//     <Component
//       {...props}
//       {...propsFromRouter}
//     />
//   );
//   return <Route render={withProps} {...spreadToRoute} />;
// };

export default PropsRoute;
