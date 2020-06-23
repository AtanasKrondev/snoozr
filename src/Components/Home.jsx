import React, { useContext, useState } from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BoardCard from './Board/BoardCard'
import BoardCardForm from './Board/BoardCardForm'
import { UserContext } from '../providers/UserProvider';
import { useEffect } from 'react';
import { usersRef } from '../firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        overflowY: 'scroll',
        height: '90vh',
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.dark,
            borderRadius: '0.8em'
        }
    }
}));

export default function Home() {
    const classes = useStyles();
    const [boards, setBoards] = useState(null)
    const [loading, setLoading] = useState(false)
    const { user } = useContext(UserContext)
    useEffect(() => {
        const uid = user ? user.uid : '';
        const cleanUp = uid && usersRef.doc(uid).onSnapshot(snapshot => {
            setLoading(true)
            const data = snapshot.data();
            setBoards(data.boards);
            setLoading(false);
        }, error => console.error(error))
        return () => cleanUp();
    }, [user])

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
