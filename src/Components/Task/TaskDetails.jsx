import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
    DialogTitle, DialogContent, IconButton, FormControl, FormLabel,
    FormGroup, FormControlLabel, CircularProgress, TextField
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ImageIcon from '@material-ui/icons/Image';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import CommentCard from '../Comment/CommentCard';
import TaskImage from './TaskImage'
import CommentForm from '../Comment/CommentForm'
import { tasksRef } from '../../firebase';
import SaveIcon from '@material-ui/icons/Save';
import { Formik } from 'formik';
import { title, description } from '../../vaildators';

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
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true)

    const [isOpenImg, setIsOpenImg] = useState(false);
    const handleOpenImg = () => setIsOpenImg(!isOpenImg);

    const [editTitle, setEditTitle] = useState(false);
    const handleEditTitle = () => setEditTitle(!editTitle)

    const [editDescription, setEditDescription] = useState(false);
    const handleEditDescription = () => setEditDescription(!editDescription)

    useEffect(() => tasksRef.doc(id).onSnapshot(snapshot => {
        setLoading(true)
        const data = snapshot.data();
        setTask({ id, ...data });
        setLoading(false);
    }), [id])

    return (
        <>
            {loading ? <CircularProgress color="secondary" /> : <>
                <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth scroll="body" fullScreen={fullScreen}>
                    <div className={classes.cover}>
                        {task.image && <img src={task.image} className={classes.img} alt="task" onClick={handleOpenImg} />}
                        <IconButton className={classes.topRight} onClick={handleClose}><CloseIcon /></IconButton>
                        <IconButton className={classes.bottomRight} onClick={handleOpenImg} ><ImageIcon /></IconButton>
                        <Typography className={classes.bottomLeft} variant="subtitle2">in list: To DO</Typography>
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
                            {task.dueDate ?
                                        <IconButton size="small"><EditIcon /></IconButton> :
                                        <IconButton size="small"><AddIcon /></IconButton>
                                    }
                                </Typography>
                                <Typography variant="body2" component="p">{task.dueDate && task.dueDate.toString()}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Typography variant="body1" component="h3">Description
                                <IconButton size="small" onClick={handleEditDescription}>{task.description ? <EditIcon /> : <AddIcon />}</IconButton>
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
                                                {...getFieldProps('description')}
                                            />
                                            <IconButton size="small" type="submit"><SaveIcon /></IconButton>
                                            <IconButton size="small" onClick={handleEditDescription}><CloseIcon /></IconButton>
                                        </form>)}
                                </Formik>
                                    : <Typography variant="body1" component="p">{task.description}</Typography>
                                }
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl>
                                    <FormLabel>
                                        Checklist
                                {task.checklist && task.checklist.length > 0 ?
                                            <IconButton size="small"><EditIcon /></IconButton> :
                                            <IconButton size="small"><AddIcon /></IconButton>
                                        }
                                    </FormLabel>
                                    <FormGroup>
                                        {task.checklist && task.checklist
                                            .map((item, index) => <FormControlLabel control={<Checkbox />} key={index} label={item} />)}
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="h3">Comments</Typography>
                                <CommentForm />
                                {task.comments && task.comments.length > 0 &&
                                    task.comments.map(comment => <CommentCard key={comment.id} comment={comment} />)}
                            </Grid>
                        </Grid>
                    </DialogContent >
                </Dialog >
                <TaskImage isOpenImg={isOpenImg} handleCloseImg={handleOpenImg} id={id} image={task.image} />
            </>}
        </>
    )
}