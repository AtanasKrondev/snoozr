import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardActionArea, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        background: theme.palette.primary.main,
        margin: theme.spacing(3),
        height: 160
    },
    listItem: {
        background: theme.palette.primary.main,
        width: '100%',
        margin: 0,
    },
    action: {
        height: '100%',
    },
}))

export default function BoardCard({ boardTitle, boardId, card }) {
    const classes = useStyles();

    return (
        <Card raised className={card ? classes.card : classes.listItem}>
            <CardActionArea className={classes.action} component={Link} to={`/board/${boardId}`} >
                <Typography gutterBottom variant="h5" align="center" >
                    {boardTitle}
                </Typography>
            </CardActionArea>
        </Card>

    )
}