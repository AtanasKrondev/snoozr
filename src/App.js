import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import theme from './theme'

import UserProvider from './providers/UserProvider'
import Header from './Components/Core/Header'
import Drawer from './Components/Core/Drawer'
import AppRouter from './Components/Core/AppRouter';

const useStyles = makeStyles({
  '@global': {
    body: {
      backgroundColor: theme.palette.background.paper
    }
  },
});

function App() {
  useStyles();
  const [isOpen, setOpen] = useState(false)
  const toggleDrawer = () => {
    setOpen(!isOpen);
  };

  return (
    <UserProvider>
      <Router>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Paper>
            <Header onClick={toggleDrawer} />
            <Drawer open={isOpen} onClose={toggleDrawer} onOpen={toggleDrawer} />
            <AppRouter />
          </Paper>
        </ThemeProvider>
      </Router>
    </UserProvider>
  );
}

export default App;
