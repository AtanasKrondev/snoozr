import React from 'react';
import SnoozeIcon from '@material-ui/icons/Snooze';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <Box flexGrow={1}>
        </Box>
        <Button
          color="inherit"
          startIcon={<SnoozeIcon />}
        >
          Snoozr
      </Button>
        <Box flexGrow={1}>
        </Box>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}