import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import { useState } from 'react';
import { useEffect } from 'react';
import { usersRef } from '../../firebase';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    comment: {
        padding: theme.spacing(0),
    },
    header: {
        padding: theme.spacing(1),
    }
}));

export default function CommentCard({ comment, authorId }) {
    const classes = useStyles();
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cleanUp = usersRef.doc(authorId).onSnapshot(snapshot => {
            setLoading(true)
            const data = snapshot.data();
            const id = snapshot.id;
            setAuthor({ id, ...data });
            setLoading(false);
        }, error => console.error(error))
        return () => cleanUp()
    }, [authorId])

    return (
        <Card >
            <CardHeader
                avatar={loading ? <CircularProgress color="secondary" /> :
                    author && (author.photoURL ?
                        <Avatar alt={author.displayName} src={author.photoURL} />
                        : <Avatar>{author.displayName && author.displayName[0]}</Avatar>)
                }
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={loading ? <CircularProgress color="secondary" /> : author && author.displayName}
                subheader={comment.timestamp && moment.unix(comment.timestamp.seconds).format('MMMM Do HH:mm')}
                className={classes.header}
            />
            <CardContent className={classes.comment}>
                <Typography variant="body2" component="p">
                    {comment.comment}
                </Typography>
            </CardContent>
        </Card>
    );
}