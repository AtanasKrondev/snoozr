import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardActionArea, makeStyles, CircularProgress } from '@material-ui/core';
import { boardsRef } from '../../firebase';

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

export default function BoardCard({ id, card }) {
    const classes = useStyles();
    const [board, setBoard] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => boardsRef.doc(id).onSnapshot(snapshot => {
        setLoading(true)
        const data = snapshot.data();
        setBoard({ id, ...data });
        setLoading(false);
    }, error => console.error(error)), [id])

    return (
        <Card raised className={card ? classes.card : classes.listItem}>
            {loading ? <CircularProgress color="secondary" /> :
                <CardActionArea className={classes.action} component={Link} to={`/board/${id}`} >
                    <Typography gutterBottom variant="h5" align="center" >
                        {board.title} ({board.lists && board.lists.length})
                    </Typography>
                </CardActionArea>}
        </Card>
    )
}