import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import blueGrey from 'material-ui/colors/blueGrey';
import lightGreen from 'material-ui/colors/lightGreen';
import cyan from 'material-ui/colors/cyan';
import lightBlue from 'material-ui/colors/lightBlue';
import pink from 'material-ui/colors/pink';

const palette = {
  primary:
  cyan,
  secondary:
  lightBlue,
  action:
  lightGreen,
  grey:
  blueGrey,
  error:
  pink,
};
const typography = {
  display4: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: '2em',
    letterSpacing: '-4px',
    textShadow: '2px 0 1px red, 4px 0 1px orange, 6px 0 1px yellow, 8px 0 1px green, 10px 0 1px blue, 12px 0 1px indigo, 15px 0 1px violet',
    marginLeft: '-15px',
  },
  display3: {
    // fontFamily: 'monospace',
    fontSize: '6rem',
    fontWeight: '100',
    letterSpacing: '0.05em',
    color: 'black',
    marginTop: '0',
  },
  display2: {
    marginBottom: '2%',
  },
};
const overrides = {
  MuiToolbar: {
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: palette.secondary.A200,
      border: '1px solid black',
    },
  },
  MuiPaper: {
    root: {
      backgroundColor: palette.secondary[200],
      textAlign: 'center',
      padding: '2vh',
    },
  },
  MuiGridList: {
    root: {
      padding: '1vh',
    },
  },
  MuiListItem: {
    root: {
      textAlign: 'center',
    },
  },
  MuiButton: {
    raised: {
      margin: 'auto',
      borderRadius: '20px',
    },
  },
  MuiInput: {
    root: {
      fontSize: '1.5em',
    },
  },
  MuiFormLabel: {
    root: {
      color: palette.action[900],
    },
  },
  MuiMenu: {
    paper: {
      backgroundColor: palette.secondary[100],
      minWidth: '20%',
    },
  },
  MuiMenuItem: {
    root: {
      
    },
  },
};
const styles = {
  palette,
  typography,
  overrides,
};

const PublicThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={createMuiTheme(styles)}>
    <Reboot />
    {children}
  </MuiThemeProvider>
);

export default PublicThemeProvider;
