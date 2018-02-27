import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const PublicThemeProvider = ({ children }) => (
  <MuiThemeProvider
    theme={createMuiTheme({
      palette: {
        primary: {
          light: '#ffeeff',
          main: '#ffbbd0',
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
        background: {
          AppBar: {
            color: '#000000',
          },
        },
      },
    })}
  >
    {children}
  </MuiThemeProvider>
);

export default PublicThemeProvider;
