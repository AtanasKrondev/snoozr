import React, { useState, useEffect, useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { usersRef, commentsRef, tasksRef, fieldValue } from '../../firebase';
import { CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button } from '@material-ui/core';
import { UserContext } from '../../providers/UserProvider';


const useStyles = makeStyles(theme => ({
    comment: {
        padding: theme.spacing(0),
    },
    header: {
        padding: theme.spacing(1),
    }
}));

export default function CommentCard({ comment, authorId, task }) {
    const classes = useStyles();
    const { user } = useContext(UserContext)
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

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

    const deleteComment = () => {
        tasksRef.doc(task).set({ comments: fieldValue.arrayRemove(comment.id) }, { merge: true }).catch(error => console.log(error))
        commentsRef.doc(comment.id).delete().catch(error => console.log(error))
    }

    return (
        <>
            <Card >
                <CardHeader
                    avatar={loading ? <CircularProgress color="secondary" /> :
                        author && (author.photoURL ?
                            <Avatar alt={author.displayName} src={author.photoURL} />
                            : <Avatar>{author.displayName && author.displayName[0]}</Avatar>)
                    }
                    action={comment.author === user.uid && <IconButton onClick={handleOpen}>
                        <DeleteIcon />
                    </IconButton>}
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
            <Dialog open={open} onClose={handleOpen}>
                <DialogTitle>Delete this comment?</DialogTitle>
                <DialogContent>
                    <DialogContentText>{comment.comment}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpen}>Cancel</Button>
                    <Button color="primary" variant="contained" endIcon={<DeleteIcon />} onClick={deleteComment}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
