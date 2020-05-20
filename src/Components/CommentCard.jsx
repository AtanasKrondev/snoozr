import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    comment: {
        padding: theme.spacing(0),
    },
    header: {
        padding: theme.spacing(1),
    }
}));

export default function CommentCard({ comment }) {
    const classes = useStyles();

    return (
        <Card >
            <CardHeader
                avatar={
                    <Avatar>{comment.author[0]}</Avatar>
                }
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={comment.author}
                subheader={comment.date.toDateString()}
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