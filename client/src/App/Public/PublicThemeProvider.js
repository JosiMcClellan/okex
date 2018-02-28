import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import pink from 'material-ui/colors/pink';
import cyan from 'material-ui/colors/cyan';

const PublicThemeProvider = ({ children }) => (
  <MuiThemeProvider
    theme={createMuiTheme({
      palette: {
        primary: {
          light: '#ffeeff',
          main: pink[100],
          dark: '#c48b9f',
          contrastText: '#000',
        },
        secondary: {
          light: '#4f5b62',
          main: '#263238',
          dark: '#000a12',
          contrastText: '#ffffff',
        },
      },
      overrides: {
        MuiToolbar: {
          root: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: pink[100],
          },
        },
        MuiButton: {
          root: {
            // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            // borderRadius: 3,
            // border: 0,
            // color: 'white',
            // padding: '0 30px',
            // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
          },
        },
        MuiPaper: {
          root: {
            backgroundColor: cyan[100],
            color: 'black',
            textAlign: 'center',
            padding: '1vh',
          },
        },
        MuiGridList: {
          root: {
            padding: '1vh',
          },
        },
      },
    })}
  >
    <Reboot />
    {children}
  </MuiThemeProvider>
);

export default PublicThemeProvider;
