import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TaskList from '../Task/TaskList';
import TaskListForm from '../Task/TaskListForm';
import Container from '@material-ui/core/Container';
import { useParams, useHistory } from 'react-router-dom';
import { boardsRef, usersRef, fieldValue } from '../../firebase';
import { Typography, LinearProgress, IconButton, TextField, Box, Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { title } from '../../vaildators';
import { Formik, FieldArray } from 'formik';
import { UserContext } from '../../providers/UserProvider';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'scroll',
        height: '85vh',
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.dark,
            borderRadius: '0.8em'
        }
    },
    title: {
        paddingLeft: theme.spacing(3)
    }
}));

export default function Board() {
    const { id } = useParams();
    const classes = useStyles();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [editTitle, setEditTitle] = useState(false);
    const handleEditTitle = () => setEditTitle(!editTitle);
    const { user } = useContext(UserContext)

    const deleteBoard = () => {
        if (!board.lists.length) {
            boardsRef.doc(id).delete()
                .then(() => history.push('/home'))
                .catch(error => console.error(error))
            usersRef.doc(user.uid).set({ boards: fieldValue.arrayRemove(id) }, { merge: true })
                .catch(error => console.error(error))
        }
    };

    const [deleteDialog, setDeleteDialog] = useState(false);
    const handleDeleteDialog = () => setDeleteDialog(!deleteDialog);

    const [anchorEl, setAnchorEl] = useState(null)
    const handleMenuOpen = (event) => { setAnchorEl(event.currentTarget) }
    const handleMenuClose = () => setAnchorEl(null);

    useEffect(() => boardsRef.doc(id).onSnapshot(snapshot => {
        setLoading(true)
        if (snapshot.exists) {
            const data = snapshot.data();
            setBoard({ id, ...data });
            setLoading(false);
        } else history.push('/404')
    }, error => console.error(error)), [id, history])

    return (<>{loading ? <LinearProgress color="secondary" /> : <>
        <Box className={classes.title}>
            {editTitle ?
                <Formik
                    initialValues={{ title: board.title || '' }}
                    onSubmit={({ title }) => {
                        boardsRef.doc(id).set({ title }, { merge: true })
                            .then(() => handleEditTitle())
                            .catch(error => console.log(error))
                    }}
                    validationSchema={title}>
                    {({ touched, errors, getFieldProps, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                id="boardTitle"
                                error={touched.title && !!errors.title}
                                helperText={errors.title}
                                {...getFieldProps('title')}
                            />
                            <IconButton size="small" type="submit"><SaveIcon /></IconButton>
                            <IconButton size="small" onClick={handleEditTitle}><CloseIcon /></IconButton>
                        </form>)}
                </Formik> :
                <Typography component="h1" variant="h6">{board && board.title}
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
                        {board && board.lists && !board.lists.length &&
                            (<MenuItem onClick={handleDeleteDialog}>
                                <ListItemIcon><DeleteIcon /></ListItemIcon>
                                <ListItemText primary="Delete" />
                            </MenuItem>)}
                    </Menu>
                </Typography>}
        </Box>
        <Container className={classes.root}>
            <Formik initialValues={{ lists: board.lists || [] }}
                onSubmit={({ lists }) => boardsRef.doc(id)
                    .set({ lists }, { merge: true }).catch(error => console.log(error))}>
                {({ values, handleSubmit }) => <FieldArray name="lists"
                    render={arrayHelpers => (<>
                        {values.lists && values.lists
                            .map((listId, index) => (
                                <TaskList
                                    key={listId} id={listId} boardId={id}
                                    prevId={values.lists[index - 1]} nextId={values.lists[index + 1]}>
                                    <MenuItem
                                        disabled={index === 0}
                                        onClick={() => { if (index !== 0) { arrayHelpers.swap(index, index - 1); handleSubmit() } }}
                                    >
                                        <ListItemIcon><KeyboardArrowLeftIcon /></ListItemIcon>
                                        <ListItemText primary="Move Left" />
                                    </MenuItem>
                                    <MenuItem
                                        disabled={values.lists && index === values.lists.length - 1}
                                        onClick={() => { if (index !== values.lists.length - 1) { arrayHelpers.swap(index, index + 1); handleSubmit() } }}
                                    >
                                        <ListItemIcon><KeyboardArrowRightIcon /></ListItemIcon>
                                        <ListItemText primary="Move Right" />
                                    </MenuItem>
                                </TaskList>))}
                    </>)}
                />}
            </Formik>
            < TaskListForm boardId={id} />
        </ Container></>}
        <Dialog open={deleteDialog} onClose={handleDeleteDialog}>
            <DialogTitle>Delete this board?</DialogTitle>
            <DialogContent>
                <DialogContentText>{board && board.title}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteDialog}>Cancel</Button>
                <Button color="primary" variant="contained" endIcon={<DeleteIcon />} onClick={deleteBoard}>Delete</Button>
            </DialogActions>
        </Dialog>
    </>
    )
}