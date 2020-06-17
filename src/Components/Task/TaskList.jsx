import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TaskCard from './TaskCard'
import TaskCardForm from './TaskCardForm'
import { Typography, Paper, CircularProgress } from '@material-ui/core';
import { listsRef } from '../../firebase';

const useStyles = makeStyles((theme) => ({
    list: {
        margin: theme.spacing(1),
        padding: 0,
        flexShrink: 0,
        flexGrow: 1,
        width: 300,
        maxWidth: 300,
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.dark,
            borderRadius: '0.8em'
        }
    },
}));



export default function TaskList({ id }) {
    const classes = useStyles();
    const [list, setList] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => listsRef.doc(id).onSnapshot(snapshot => {
        setLoading(true)
        const data = snapshot.data();
        setList({ id, ...data });
        setLoading(false);
    }, error => console.error(error)), [id])


    return (
        <Paper className={classes.list} >
            {loading ? <CircularProgress color="secondary" /> : <>
                <Typography gutterBottom variant="subtitle1" component="h2">
                    {list && list.title} ({list && list.tasks.length})
            </Typography>
                {list.tasks && list.tasks.sort((a, b) => a.position - b.position)
                    .map(({ id }) => <TaskCard key={id} id={id} />)}
                <TaskCardForm listId={list && list.id} /></>}
        </Paper >
    );
}