import React from 'react';
import { Grid, Typography, Card, CardActionArea, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        background: theme.palette.primary.main,
        margin: theme.spacing(3),
        height: 160,
    },
    action: {
        height: '100%',
    }
}))

export default function BoardCard() {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card raised className={classes.card}>
                <CardActionArea className={classes.action}>
                    <Typography gutterBottom variant="h5" component="h2" align="center" >
                        Board Name
                    </Typography>
                </CardActionArea>
            </Card>
        </Grid>
    )
}