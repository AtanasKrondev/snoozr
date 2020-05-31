import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Typography, Button, Container, makeStyles, Card, CardContent, CardActions } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default function NotFound() {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Container className={classes.root}>
            <Card>
                <CardContent>
                    <Typography componen="h2" variant="h3">404</Typography>
                    <Typography component="h3" variant="h5">Seems like you are lost</Typography>
                </CardContent>
                <CardActions>
                    <Button
                        startIcon={<HomeIcon />}
                        component={Link}
                        to="/">Home</Button>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={history.goBack}>Back</Button>
                </CardActions>
            </Card>
        </Container>
    )
}