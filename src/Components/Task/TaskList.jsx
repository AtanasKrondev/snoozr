import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TaskCard from './TaskCard'
import TaskCardForm from './TaskCardForm'
import { Typography, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    list: {
        margin: theme.spacing(1),
        padding: 0,
        width: '300px',
        flexShrink: 0,
        flexGrow: 1,
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



export default function TaskList({ list }) {
    const classes = useStyles();

    return (
        <Paper className={classes.list} >
            <Typography gutterBottom variant="h6" component="h2" align="center">
                {list.title} ({list.tasks.length})
            </Typography>
            {list.tasks.map(task => <TaskCard key={task.id} task={task} />)}
            <TaskCardForm listId={list.id} />
        </Paper >
    );
}