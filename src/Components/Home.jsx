import React, { useContext, useState } from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BoardCard from './Board/BoardCard'
import BoardCardForm from './Board/BoardCardForm'
import { UserContext } from '../providers/UserProvider';
import { useEffect } from 'react';
import { usersRef } from '../firebase';
import { NotificationsContext } from '../providers/NotificationsProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
    }
}));

export default function Home() {
    const classes = useStyles();
    const [boards, setBoards] = useState(null)
    const [loading, setLoading] = useState(false)
    const { user } = useContext(UserContext)
    const { showMessage } = useContext(NotificationsContext)

    useEffect(() => {
        const uid = user ? user.uid : '';
        const cleanUp = uid && usersRef.doc(uid).onSnapshot(snapshot => {
            if (snapshot.exists) {
                setLoading(true)
                const data = snapshot.data();
                setBoards(data.boards);
                setLoading(false);
            }
        }, error => { console.log(error); showMessage('Something went wrong!', 'warning') })
        return () => cleanUp();
    }, [user, showMessage])

    return (<>{
        loading ? <LinearProgress color="secondary" /> :
            < Container className={classes.root} >
                <Grid container>
                    {boards && boards.map((id) => (
                        <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
                            <BoardCard id={id} card />
                        </Grid>))}
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <BoardCardForm card />
                    </Grid>
                </Grid>
            </Container >
    }</>)
}
