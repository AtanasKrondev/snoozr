import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Typography, Button, Container, makeStyles, Avatar, ButtonGroup } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SnoozeIcon from '@material-ui/icons/Snooze';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    button: {
        margin: theme.spacing(1)
    }
}))

export default function NotFound() {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Container maxWidth="xs" className={classes.root}>
            <Avatar className={classes.avatar}> <SnoozeIcon /></Avatar>
            <Typography component="h1" variant="h3">404</Typography>
            <Typography component="h2" variant="h5">Seems like you are lost</Typography>
            <ButtonGroup fullWidth variant="contained" color="primary">
                <Button
                    startIcon={<HomeIcon />}
                    component={Link}
                    to="/">Home</Button>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={history.goBack}>Back</Button>
            </ButtonGroup>
        </Container>
    )
}