import React, { useState, useEffect, useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
    DialogTitle, DialogContent, IconButton, CircularProgress, TextField, Button
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ImageIcon from '@material-ui/icons/Image';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import TaskImage from './TaskImage'
import { tasksRef } from '../../firebase';
import { Formik } from 'formik';
import { title, description } from '../../vaildators';
import TaskDatePicker from './TaskDatePicker';
import moment from 'moment'
import TaskChecklist from './TaskChecklist';
import CommentContainer from '../Comment/CommentContainer';
import TaskEdit from './TaskEdit';

const useStyles = makeStyles(theme => ({
    cover: {
        width: '100%',
        height: 160,
        overflow: 'hidden',
        textAlign: 'center',
        position: 'relative'
    },
    topRight: {
        position: 'absolute',
        top: theme.spacing(0),
        right: theme.spacing(1),
        mixBlendMode: 'difference'
    },
    bottomRight: {
        position: 'absolute',
        bottom: theme.spacing(0),
        right: theme.spacing(1),
        mixBlendMode: 'difference'
    },
    bottomLeft: {
        position: 'absolute',
        bottom: theme.spacing(0),
        left: theme.spacing(1),
        mixBlendMode: 'difference'
    },
    img: {
        height: '100%',
        width: 'auto',
    },
}));


export default function TaskDetails({ isOpen, handleClose, id }) {
    const classes = useStyles();
    const theme = useTheme();
    const { showMessage } = useContext
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true)

    const [isOpenImg, setIsOpenImg] = useState(false);
    const handleOpenImg = () => setIsOpenImg(!isOpenImg);

    const [editTask, setEditTask] = useState(false);
    const handleEditTask = () => setEditTask(!editTask);

    const [editTitle, setEditTitle] = useState(false);
    const handleEditTitle = () => setEditTitle(!editTitle);

    const [editDescription, setEditDescription] = useState(false);
    const handleEditDescription = () => setEditDescription(!editDescription);

    const [editDueDate, setEditDueDate] = useState(false);
    const handleEditDueDate = () => setEditDueDate(!editDueDate);

    useEffect(() => tasksRef.doc(id).onSnapshot(snapshot => {
        setLoading(true)
        const data = snapshot.data();
        setTask({ id, ...data });
        setLoading(false);
    }, error => { console.log(error); showMessage(error.message, 'error') }), [id, showMessage])

    return (
        <>
            {loading ? <CircularProgress color="secondary" /> : <>
                <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth scroll="body" fullScreen={fullScreen}>
                    <div className={classes.cover}>
                        {task.image && <img src={task.image} className={classes.img} alt="task" onClick={handleOpenImg} />}
                        <IconButton className={classes.topRight} onClick={handleClose}><CloseIcon /></IconButton>
                        <IconButton className={classes.bottomRight} onClick={handleOpenImg} ><ImageIcon /></IconButton>
                        <Typography className={classes.bottomLeft}>
                            <Button variant="contained" endIcon={<EditIcon />} onClick={handleEditTask}>Edit task</Button></Typography>
                    </div>
                    <DialogTitle>
                        {editTitle ?
                            <Formik
                                initialValues={{ title: task.title || '' }}
                                onSubmit={({ title }) => {
                                    tasksRef.doc(id).set({ title }, { merge: true })
                                        .then(() => handleEditTitle())
                                        .catch(error => console.log(error))
                                }}
                                validationSchema={title}>
                                {({ touched, errors, getFieldProps, handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <TextField
                                            id="title"
                                            error={touched.title && !!errors.title}
                                            helperText={errors.title}
                                            {...getFieldProps('title')}
                                        />
                                        <IconButton size="small" type="submit"><SaveIcon /></IconButton>
                                        <IconButton size="small" onClick={handleEditTitle}><CloseIcon /></IconButton>
                                    </form>)}
                            </Formik> :
                            <>{task.title}<IconButton size="small" onClick={handleEditTitle}><EditIcon /></IconButton></>}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="h3">Due Date
                                {editDueDate ?
                                        <IconButton size="small" onClick={handleEditDueDate}><CloseIcon /></IconButton>
                                        : <IconButton size="small" onClick={handleEditDueDate}>
                                            {task.dueDate ? <EditIcon /> : <AddIcon />}</IconButton>}

                                </Typography>
                                {editDueDate ?
                                    <TaskDatePicker id={id} initDate={task.dueDate} close={handleEditDueDate} /> :
                                    <Typography variant="body1" component="p">
                                        {task.dueDate && moment.unix(task.dueDate.seconds).format('MMMM Do HH:mm')}
                                    </Typography>}
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="body1" component="h3">Description
                                {editDescription ?
                                        <IconButton size="small" onClick={handleEditDescription}><CloseIcon /></IconButton>
                                        : <IconButton size="small" onClick={handleEditDescription}>
                                            {task.description ? <EditIcon /> : <AddIcon />}</IconButton>}
                                </Typography>
                                {editDescription ? <Formik
                                    initialValues={{ description: task.description || '' }}
                                    onSubmit={({ description }) => {
                                        tasksRef.doc(id).set({ description }, { merge: true })
                                            .then(() => handleEditDescription())
                                            .catch(error => console.log(error))
                                    }}
                                    validationSchema={description}>
                                    {({ touched, errors, getFieldProps, handleSubmit }) => (
                                        <form onSubmit={handleSubmit}>
                                            <TextField
                                                onBlur={handleEditDescription}
                                                id="description"
                                                error={touched.description && !!errors.description}
                                                helperText={errors.description}
                                                multiline
                                                rows={1}
                                                rowsMax={4}
                                                {...getFieldProps('description')}
                                            />
                                            <IconButton size="small" type="submit"><SaveIcon /></IconButton>
                                            <IconButton size="small" onClick={handleEditDescription}><CloseIcon /></IconButton>
                                        </form>)}
                                </Formik>
                                    : <Typography variant="body1" component="p">{task.description}</Typography>
                                }
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TaskChecklist id={id} checklist={task.checklist} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="h3">Comments</Typography>
                                <CommentContainer task={id} />
                            </Grid>
                        </Grid>
                    </DialogContent >
                </Dialog >
                <TaskImage isOpenImg={isOpenImg} handleCloseImg={handleOpenImg} id={id} image={task.image} />
                <TaskEdit open={editTask} onClose={handleEditTask} id={id} list={task.list} title={task.title} />
            </>}
        </>
    )
}