import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SnoozeIcon from '@material-ui/icons/Snooze';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { UserContext } from '../../providers/UserProvider'
import { Avatar } from '@material-ui/core';

import UserMenu from './UserMenu'

export default function Header({ onClick }) {
  const { user, loading } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null)
  const handleMenuOpen = (event) => { setAnchorEl(event.currentTarget) }
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" onClick={onClick} disabled={!user}>
            <MenuIcon />
          </IconButton>
          <Box flexGrow={1}>
          </Box>
          <Button

            startIcon={<SnoozeIcon />}
            component={Link}
            to="/"
          >
            Snoozr
      </Button>
          <Box flexGrow={1}>
          </Box>
          {loading ? <CircularProgress color="secondary" /> :
            user ? <IconButton onClick={handleMenuOpen}>
              {
                user.photoURL ?
                  <Avatar alt={user.displayName} src={user.photoURL} />
                  : <Avatar>{user.displayName && user.displayName[0]}</Avatar>
              }
            </IconButton> :
              <Button

                startIcon={<ExitToAppIcon />}
                component={Link}
                to="/signin"
              >
                Sign In
      </Button>
          }
        </Toolbar>
      </AppBar>
      <UserMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} />
    </>
  );
}