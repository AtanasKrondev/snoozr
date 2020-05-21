import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Components/Header'
import Board from './Components/Board/Board'
// import Home from './Components/Home'
// import SignIn from './Components/Auth/SignIn'
// import SignUp from './Components/Auth/SignUp'
import { ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import theme from './theme'

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
});

function App() {

  const classes = useStyles();

  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Paper className={classes.root} square>
          <Header />
          {/* <Home /> */}
          <Board />
          {/* <SignIn /> */}
          {/* <SignUp /> */}
        </Paper>
      </ThemeProvider>
    </div>
  );
}

export default App;
