import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import SubjectIcon from '@material-ui/icons/Subject';
import CommentIcon from '@material-ui/icons/Comment';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import TaskDetails from './TaskDetails'

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.background.default,
        maxWidth: 345,
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    media: {
        height: 140,
    },
    content: {
        padding: theme.spacing(1),
    },
    actions: {
        padding: 0
    }
}));

export default function TaskCard({ task }) {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <Card raised className={classes.root}>
                <CardActionArea onClick={handleOpen}>
                    {task.image && <CardMedia
                        className={classes.media}
                        image={task.image}
                        title="Task Image"
                    />}
                    <CardContent className={classes.content}>
                        <Typography variant="body2" component="p">
                            {task.title}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions}>
                        {task.description && <SubjectIcon />}
                        {task.comments && task.comments.length > 0 && <>
                            <CommentIcon />
                            {task.comments.length}</>}
                        {task.checklist && task.checklist.length > 0 && <>
                            <CheckBoxIcon />
                            {task.checklist.length}
                        </>}
                        {task.dueDate && <>
                            <ScheduleIcon />
                            {task.dueDate.toDateString()}
                        </>}
                    </CardActions>
                </CardActionArea>
            </Card >
            <TaskDetails isOpen={isOpen} handleClose={handleClose} task={task} />
        </>
    );
}