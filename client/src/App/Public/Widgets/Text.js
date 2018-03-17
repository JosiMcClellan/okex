/* eslint-disable key-spacing, quote-props */

import React from 'react';
import Typography from 'material-ui/Typography';
import BreakProps from './BreakProps';

export const TextVariants = BreakProps.singleProp('variant', { Component: Typography });

export const H1 = props => (
  <TextVariants
    {...props}
    keyBase="community-name"
    breaks={{
      'md lg xl': 'display3',
      'sm':       'display2',
      'xs':       'title',
    }}
  />
);
export const H2 = props => (
  <TextVariants
    {...props}
    noWrap
    keyBase="h2"
    breaks={{
      'md lg xl': 'display2',
      'xs':       'headline',
      'sm':       'display1',
    }}
  />
);
export const H3 = props => (
  <TextVariants
    {...props}
    keyBase="h2"
    breaks={{
      'md lg xl': 'display1',
      'sm':       'title',
      'xs':       'subheading',
    }}
  />
);
export const Caption = props => (
  <TextVariants
    {...props}
    keyBase="caption"
    breaks={{
      'md lg xl': 'subheading',
      'xs':       'caption',
      'sm':       'body1',
    }}
  />
);
