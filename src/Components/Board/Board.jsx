import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TaskList from '../Task/TaskList';
import TaskListForm from '../Task/TaskListForm';
import Container from '@material-ui/core/Container';
import { useParams, useHistory } from 'react-router-dom';
import { boardsRef } from '../../firebase';
import { Typography, LinearProgress, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'scroll',
        height: '85vh',
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
    },
}));

export default function Board() {
    const { id } = useParams();
    const classes = useStyles();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory()

    useEffect(() => boardsRef.doc(id).onSnapshot(snapshot => {
        setLoading(true)
        if (snapshot.exists) {
            const data = snapshot.data();
            setBoard({ id, ...data });
            setLoading(false);
        } else history.push('/404')
    }), [id, history])

    return (<>{loading ? <LinearProgress color="secondary" /> : <>
        <Typography component="h1" variant="h6" align="center">{board && board.title}<IconButton size="small"><EditIcon /></IconButton></Typography>
        <Container className={classes.root}>
            {board.lists && board.lists.sort((a, b) => a.position - b.position)
                .map(({ id }) => (<TaskList key={id} id={id}></TaskList>))}
            < TaskListForm boardId={id} />
        </ Container></>}
    </>
    )
}