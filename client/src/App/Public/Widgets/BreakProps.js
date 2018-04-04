import React from 'react';
import PropTypes from 'prop-types';
import Hidden from 'material-ui/Hidden';

class BreakProps extends React.Component {
  static Shown = ({ only, ...rest }) => {
    const inverse = ['xs', 'sm', 'md', 'lg', 'xl'].filter(size => !only.includes(size));
    return <Hidden only={inverse} {...rest} />;
  }

  static singleProp = (propName, defaults = {}) => (
    ({ breaks, ...rest }) => {
      Object.entries(breaks).forEach(([size, value]) => {
        breaks[size] = { [propName]: value };
      });
      return <BreakProps {...{ breaks, ...rest, ...defaults }} />;
    }
  )

  contents() {
    const {
      Component, breaks, keyBase, ...propsForAllSizes
    } = this.props;
    return Object.entries(breaks).map(([sizes, propsForThisSize]) => (
      <BreakProps.Shown only={sizes.split(' ')} key={`${keyBase}:${sizes}`}>
        <Component {...propsForThisSize} {...propsForAllSizes} />
      </BreakProps.Shown>
    ));
  }

  render() { return <div>{this.contents()}</div>; }
}

BreakProps.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  breaks: PropTypes.objectOf(PropTypes.object).isRequired,
  keyBase: PropTypes.string.isRequired,
  // rest spread to Component
};

// EXAMPLES:

// <BreakProps keyBase="cats" component={GridList} spacing={10} breaks={{
//   xs:      { cols: 1, cellHeight: 90  },
//   'sm md': { cols: 2, cellHeight: 120 },
//   lg:      { cols: 3, cellHeight: 150 },
//   xl:      { cols: 4, cellHeight: 240 },
// }}>
//   <GridListItem>...
// </BreakProps>

// <BreakProps keyBase="cancel-order" component={Button} breaks={{
//   xs:      { variant: 'fab', mini: true, children: "x" },
//   sm:      { variant: 'fab', children: "X" },
//   'md lg': { variant: 'raised', children: "cancel" },
//   xl:      { variant: 'flat', children: "Cancel Order" },
// }}></BreakProps>

// const MyGridList = BreakProps.singleProp('cols', { Component: GridList, spacing: 10 });
//
// <MyGridList keyBase="cats" cellHeight={180} breaks={{
//   xs: 1,
//   'sm md': 2,
//   lg: 3,
//   xl: 4,
// }}>
//   <GridListItem>...
// </MyGridList>

// const BreakImage = BreakProps.singleProp('width', {
//   component: 'img',
//   height: 'auto'
// })
// <BreakImage src="/myCat.jpg" breaks={{
//   xs: '100px',
//   sm: '120px',
//   md: '150px',
//   lg: '200px',
//   xl: '300px',
// }} />

// const Versions = BreakProps.singleProp('children')
// <Versions breaks={
//   'xs sm': MobileLayout,
//   'md lg': LaptopLayout,
//   'xl': BigscreenLayout,
// }>

export default BreakProps;
