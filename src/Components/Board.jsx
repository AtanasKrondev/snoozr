import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TaskList from './TaskList'
import Container from '@material-ui/core/Container';
import lists from '../data'


const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: '#934054',
        paddingTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'scroll',
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
    },
}));

export default function Board() {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            {lists.map((list) => (
                <TaskList key={list.id} list={list}></TaskList>
            ))}
        </Container>
    )
}