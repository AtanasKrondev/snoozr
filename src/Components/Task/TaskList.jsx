import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TaskCard from './TaskCard'
import TaskCardForm from './TaskCardForm'
import { Typography, CircularProgress, TextField, IconButton, Menu, MenuItem, ListItemText, ListItemIcon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { listsRef, boardsRef, fieldValue } from '../../firebase';
import { Formik } from 'formik';
import { title } from '../../vaildators';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import { NotificationsContext } from '../../providers/NotificationsProvider';
import { Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
    list: {
        margin: theme.spacing(1),
        padding: 0,
        flexShrink: 0,
        flexGrow: 1,
        width: 300,
        maxWidth: 300,
    },
    button: { padding: 0 },
    dropContainer: { minHeight: 1 }
}));



export default function TaskList({ id, boardId, children }) {
    const classes = useStyles();
    const { showMessage } = useContext(NotificationsContext)
    const [list, setList] = useState(null);
    const [loading, setLoading] = useState(true)

    const [editTitle, setEditTitle] = useState(false);
    const handleEditTitle = () => setEditTitle(!editTitle);

    const [anchorEl, setAnchorEl] = useState(null)
    const handleMenuOpen = (event) => { setAnchorEl(event.currentTarget) }
    const handleMenuClose = () => setAnchorEl(null);

    useEffect(() => listsRef.doc(id).onSnapshot(snapshot => {
        setLoading(true)
        const data = snapshot.data();
        setList({ id, ...data });
        setLoading(false);
    }, error => { console.log(error); showMessage(error.message, 'error') }), [id, showMessage])

    const deleteList = () => {
        if (!list.tasks.length) {
            listsRef.doc(id).delete()
                .then(() => showMessage('List deleted', 'info'))
                .catch(error => { console.log(error); showMessage(error.message, 'error') })
            boardsRef.doc(boardId).set({ lists: fieldValue.arrayRemove(id) }, { merge: true })
                .catch(error => { console.log(error); showMessage(error.message, 'error') })
        }
    };

    const [deleteDialog, setDeleteDialog] = useState(false);
    const handleDeleteDialog = () => setDeleteDialog(!deleteDialog)


    return (
        <>
            <div className={classes.list} >
                {loading ? <CircularProgress color="secondary" /> : <>
                    {editTitle ?
                        <Formik
                            initialValues={{ title: list.title || '' }}
                            onSubmit={({ title }) => {
                                listsRef.doc(id).set({ title }, { merge: true })
                                    .then(() => handleEditTitle())
                                    .catch(error => { console.log(error); showMessage(error.message, 'error') })
                            }}
                            validationSchema={title}>
                            {({ touched, errors, getFieldProps, handleSubmit, dirty, isValid }) => (
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        id="listTitle"
                                        error={touched.title && !!errors.title}
                                        helperText={errors.title}
                                        {...getFieldProps('title')}
                                    />
                                    <IconButton size="small" type="submit" disabled={!isValid || !dirty}><SaveIcon /></IconButton>
                                    <IconButton size="small" onClick={handleEditTitle}><CloseIcon /></IconButton>
                                </form>)}
                        </Formik> :
                        <Typography gutterBottom variant="subtitle1" component="h2">
                            {list && list.title} ({list && list.tasks && list.tasks.length})
                        <IconButton size="small" onClick={handleMenuOpen}><MoreVertIcon /></IconButton>
                            <Menu anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                onClick={handleMenuClose}>
                                <MenuItem onClick={handleEditTitle}>
                                    <ListItemIcon><EditIcon /></ListItemIcon>
                                    <ListItemText primary="Edit" />
                                </MenuItem>
                                {children}
                                {list && list.tasks && !list.tasks.length &&
                                    (<MenuItem onClick={handleDeleteDialog}>
                                        <ListItemIcon><DeleteIcon /></ListItemIcon>
                                        <ListItemText primary="Delete" />
                                    </MenuItem>)}
                            </Menu>
                        </Typography>
                    }
                    <Droppable droppableId={id}>
                        {provided => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className={classes.dropContainer}>
                                {list.tasks && list.tasks
                                    .map((taskId, index) => <TaskCard id={taskId} key={taskId} index={index} />)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <TaskCardForm listId={list && list.id} /></>}
            </div >
            <Dialog open={deleteDialog} onClose={handleDeleteDialog}>
                <DialogTitle>Delete this list?</DialogTitle>
                <DialogContent>
                    <DialogContentText>{list && list.title}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialog}>Cancel</Button>
                    <Button color="primary" variant="contained" endIcon={<DeleteIcon />} onClick={deleteList}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}