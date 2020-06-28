import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardActionArea, makeStyles, CircularProgress } from '@material-ui/core';
import { boardsRef } from '../../firebase';
import { NotificationsContext } from '../../providers/NotificationsProvider';

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
    const { showMessage } = useContext(NotificationsContext);

    useEffect(() => boardsRef.doc(id).onSnapshot(snapshot => {
        setLoading(true)
        const data = snapshot.data();
        setBoard({ id, ...data });
        setLoading(false);
    }, error => { console.log(error); showMessage(error.message, 'error') }), [id, showMessage])

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