import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Components/Core/Header'
import Drawer from './Components/Core/Drawer'
import Board from './Components/Board/Board'
import Home from './Components/Home'
import SignIn from './Components/Auth/SignIn'
import SignUp from './Components/Auth/SignUp'

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
  const [isOpen, setOpen] = useState(false)
  const toggleDrawer = () => {
    setOpen(!isOpen);
  };

  return (
    // <div className="App">
    <Router>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Paper className={classes.root} square>
          <Header onClick={toggleDrawer} />
          <Drawer open={isOpen} onClose={toggleDrawer} onOpen={toggleDrawer} />
          <Switch>
            <Route path="/" exact><Redirect to="/home" /></Route>
            <Route path="/home"><Home /></Route>
            <Route path="/board"><Board /></Route>
            <Route path="/signin"><SignIn /></Route>
            <Route path="/signup"><SignUp /></Route>
          </Switch>
        </Paper>
      </ThemeProvider>
    </Router>
    // </div>
  );
}

export default App;
