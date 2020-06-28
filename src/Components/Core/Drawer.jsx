import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SwipeableDrawer, makeStyles, List, ListItem, Divider, ListItemIcon, ListItemText, LinearProgress } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import BoardCardForm from '../Board/BoardCardForm';
import BoardCard from '../Board/BoardCard';
import { UserContext } from '../../providers/UserProvider';
import { usersRef } from '../../firebase';
import { NotificationsContext } from '../../providers/NotificationsProvider';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    }
}))

export default function Drawer({ open, onClose, onOpen }) {
    const classes = useStyles();
    const [boards, setBoards] = useState(null)
    const [loading, setLoading] = useState(false)
    const { user } = useContext(UserContext)
    const { showMessage } = useContext(NotificationsContext)
    useEffect(() => {
        const uid = user ? user.uid : '';
        if (uid) {
            const cleanUp = usersRef.doc(uid).onSnapshot(snapshot => {
                if (snapshot.exists) {
                    setLoading(true)
                    const data = snapshot.data();
                    setBoards(data.boards);
                    setLoading(false);
                }
            }, error => { console.log(error); showMessage(error.message, 'error') })
            return () => cleanUp();
        }
    }, [user, showMessage])

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
                    {boards && boards.map(id => (
                        <ListItem key={id}>
                            <BoardCard id={id} />
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
