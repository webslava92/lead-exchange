import React from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { App } from './app';
import './index.css';


const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {},
    },
  },
});

function AppContainer() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<AppContainer />);
