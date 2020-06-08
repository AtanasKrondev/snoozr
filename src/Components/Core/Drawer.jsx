import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SwipeableDrawer, makeStyles, List, ListItem, Divider, ListItemIcon, ListItemText, LinearProgress } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import BoardCardForm from '../Board/BoardCardForm';
import BoardCard from '../Board/BoardCard';
import { BoardsContext } from '../../providers/BoardsProvider';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    }
}))

export default function Drawer({ open, onClose, onOpen }) {
    const classes = useStyles();
    const { boards, loading } = useContext(BoardsContext)

    return (
        <SwipeableDrawer open={open} onClose={onClose} onOpen={onOpen}>
            <List className={classes.list}>
                <ListItem button component={Link} to="/">
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
            </List>
            <Divider />
            {loading ? <LinearProgress color="secondary" /> :
                <List className={classes.list}>
                    {boards.map((board, index) => (
                        <ListItem key={index}>
                            <BoardCard boardTitle={board.title} boardId={board.id} />
                        </ListItem>
                    ))}
                    <ListItem>
                        <BoardCardForm />
                    </ListItem>
                </List>
            }
        </SwipeableDrawer>
    )
}
