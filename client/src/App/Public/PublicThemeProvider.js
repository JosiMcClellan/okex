import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import pink from 'material-ui/colors/pink';
import cyan from 'material-ui/colors/cyan';
import deepPurple from 'material-ui/colors/deepPurple';
import lime from 'material-ui/colors/lime';
import grey from 'material-ui/colors/grey';

const PublicThemeProvider = ({ children }) => (
  <MuiThemeProvider
    theme={createMuiTheme({
      typography: {
        root: {
          color: 'black',
        },
        display4: {
          color: 'black',
          fontSize: '3rem',
        },
        display3: {
          color: 'black',
          fontSize: '4rem',
        },
      },
      palette: {
        primary: {
          light: deepPurple[50],
          main: pink[100],
          dark: '#c48b9f',
          contrastText: 'black',
        },
        secondary: {
          light: '#4f5b62',
          main: '#263238',
          dark: '#000a12',
          contrastText: 'white',
        },
        action: lime,
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
        MuiPaper: {
          root: {
            backgroundColor: cyan[50],
            color: grey[900],
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
      },
    })}
  >
    <Reboot />
    {children}
  </MuiThemeProvider>
);

export default PublicThemeProvider;
