import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import { auth } from '../../firebase';

export default function UserMenu({ anchorEl, handleMenuClose }) {
    const history = useHistory();

    return (
        <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}>
            <MenuItem component={Link} to="/profile">
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary="Profile" />
            </MenuItem>
                {/* <MenuItem>
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Settings" />
                </MenuItem> */}
            <MenuItem onClick={() => {
                auth.signOut()
                    .then(() => history.push('/'))
                    .catch(error => console.error(error))
            }}>
                <ListItemIcon><CloseIcon /></ListItemIcon>
                <ListItemText primary="Sign Out" />
            </MenuItem>
        </Menu>
    )
}