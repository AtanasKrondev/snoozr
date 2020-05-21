import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, IconButton, FormControl, FormLabel, FormGroup, FormControlLabel } from '@material-ui/core';
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


export default function TaskDetails({ isOpen, handleClose, task }) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const [isOpenImg, setIsOpenImg] = useState(false);

    const handleOpenImg = () => setIsOpenImg(true);
    const handleCloseImg = () => setIsOpenImg(false);

    return (
        <>
            <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth scroll="body" fullScreen={fullScreen}>
                <div className={classes.cover}>
                    {task.image && <img src={task.image} className={classes.img} alt="task" onClick={handleOpenImg} />}
                    <IconButton className={classes.topRight} onClick={handleClose}><CloseIcon /></IconButton>
                    <IconButton className={classes.bottomRight} onClick={handleOpenImg} ><ImageIcon /></IconButton>
                    <Typography className={classes.bottomLeft} variant="subtitle2">in list: To DO</Typography>
                </div>
                <DialogTitle>{task.title}
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
                            {task.description ?
                                    <IconButton size="small"><EditIcon /></IconButton> :
                                    <IconButton size="small"><AddIcon /></IconButton>
                                }
                            </Typography>
                            <Typography variant="body2" component="p">{task.description}</Typography>
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
            <TaskImage isOpenImg={isOpenImg} handleCloseImg={handleCloseImg} image={task.image} />
        </>
    )
}