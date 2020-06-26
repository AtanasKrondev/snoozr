import React, { useState, useEffect } from 'react';
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
import { tasksRef } from '../../firebase';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment'

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

export default function TaskCard({ id, children }) {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => tasksRef.doc(id).onSnapshot(snapshot => {
        setLoading(true)
        const data = snapshot.data();
        setTask({ id, ...data });
        setLoading(false);
    }, error => console.error(error)), [id])

    return (
        <>
            <Card raised className={classes.root}>
                {loading ? <CircularProgress color="secondary" />
                    : <>
                        <CardActionArea onClick={handleOpen}>
                            {task.image && <CardMedia
                                className={classes.media}
                                image={task.image}
                                title={task.title}
                            />}
                            <CardContent className={classes.content}>
                                <Typography variant="body2" component="p">
                                    {task.title}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.actions} disableSpacing >
                            {children}
                            {task.description && <SubjectIcon fontSize="small" />}
                            {task.comments && task.comments.length > 0 && <>
                                <CommentIcon fontSize="small" />
                                {task.comments.length}</>}
                            {task.checklist && task.checklist.length > 0 && <>
                                <CheckBoxIcon fontSize="small" />
                                {task.checklist.filter(a => a.checked).length}/{task.checklist.length}
                            </>}
                            {task.dueDate && <>
                                <ScheduleIcon fontSize="small" />
                                {moment.unix(task.dueDate.seconds).format('MMM D')}
                            </>}
                        </CardActions></>}
            </Card >
            <TaskDetails isOpen={isOpen} handleClose={handleClose} id={id} />
        </>
    );
}