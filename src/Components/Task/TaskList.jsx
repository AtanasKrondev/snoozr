import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TaskCard from './TaskCard'
import TaskCardForm from './TaskCardForm'
import { Typography, Paper, CircularProgress, TextField, IconButton, Menu, MenuItem, ListItemText, ListItemIcon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { listsRef, boardsRef, fieldValue } from '../../firebase';
import { Formik, FieldArray } from 'formik';
import { title } from '../../vaildators';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
    list: {
        margin: theme.spacing(1),
        padding: 0,
        flexShrink: 0,
        flexGrow: 1,
        width: 300,
        maxWidth: 300,
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.dark,
            borderRadius: '0.8em'
        }
    },
}));



export default function TaskList({ id, boardId, children }) {
    const classes = useStyles();
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
    }, error => console.error(error)), [id])

    const deleteList = () => {
        if (!list.tasks.length) {
            listsRef.doc(id).delete()
                .catch(error => console.error(error))
            boardsRef.doc(boardId).set({ lists: fieldValue.arrayRemove(id) }, { merge: true })
                .catch(error => console.error(error))
        }
    };

    const [deleteDialog, setDeleteDialog] = useState(false);
    const handleDeleteDialog = () => setDeleteDialog(!deleteDialog)


    return (
        <>
            <Paper className={classes.list} >
                {loading ? <CircularProgress color="secondary" /> : <>
                    {editTitle ?
                        <Formik
                            initialValues={{ title: list.title || '' }}
                            onSubmit={({ title }) => {
                                listsRef.doc(id).set({ title }, { merge: true })
                                    .then(() => handleEditTitle())
                                    .catch(error => console.log(error))
                            }}
                            validationSchema={title}>
                            {({ touched, errors, getFieldProps, handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        id="listTitle"
                                        error={touched.title && !!errors.title}
                                        helperText={errors.title}
                                        {...getFieldProps('title')}
                                    />
                                    <IconButton size="small" type="submit"><SaveIcon /></IconButton>
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
                    <Formik initialValues={{ tasks: list.tasks || [] }}
                        onSubmit={({ tasks }) => listsRef.doc(id)
                            .set({ tasks }, { merge: true }).catch(error => console.log(error))
                        }>
                        {({ values, handleSubmit }) => <FieldArray name="tasks"
                            render={arrayHelpers => (<>
                                {values.tasks && values.tasks
                                    .map((taskId, index) => <div key={taskId}>
                                        <TaskCard id={taskId}>
                                            <IconButton
                                                disabled={index === 0}
                                                onClick={() => { if (index !== 0) { arrayHelpers.swap(index, index - 1); handleSubmit() } }}
                                                size="small"><KeyboardArrowUpIcon /></IconButton>
                                            <IconButton
                                                disabled={values.tasks && index === values.tasks.length - 1}
                                                onClick={() => { if (index !== values.tasks.length - 1) { arrayHelpers.swap(index, index + 1); handleSubmit() } }}
                                                size="small"><KeyboardArrowDownIcon /></IconButton>
                                        </TaskCard></div>)}
                            </>)} />}
                    </Formik>
                    <TaskCardForm listId={list && list.id} /></>}
            </Paper >
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