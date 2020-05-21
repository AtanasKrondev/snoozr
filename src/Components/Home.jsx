import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BoardCard from './Board/BoardCard'
import BoardCardForm from './Board/BoardCardForm'

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: '#934054',
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
    },
}));

export default function Home() {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Grid container>
                <BoardCard />
                <BoardCard />
                <BoardCard />
                <BoardCard />
                <BoardCard />
                <BoardCard />
                <BoardCard />
                <BoardCard />
                <BoardCard />
                <BoardCardForm />
            </Grid>
        </Container>
    )
}
