import React from 'react';
import { Link } from 'react-router-dom';
import { SwipeableDrawer, makeStyles, List, ListItem, Divider, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';

import { boards } from '../../data'
import BoardCardForm from '../Board/BoardCardForm';
import BoardCard from '../Board/BoardCard';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    }
}))

export default function Drawer({ open, onClose, onOpen }) {
    const classes = useStyles();

    return (
        <SwipeableDrawer open={open} onClose={onClose} onOpen={onOpen}>
            <List className={classes.list}>
                <ListItem button component={Link} to="/">
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><CloseIcon /></ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItem>
            </List>
            <Divider />
            <List className={classes.list}>
                {boards.map((board, index) => (
                    <ListItem key={index}>
                        <BoardCard boardName={board} />
                    </ListItem>
                ))}
                <ListItem>
                    <BoardCardForm />
                </ListItem>
            </List>
        </SwipeableDrawer>
    )
}
