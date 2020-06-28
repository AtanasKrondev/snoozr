import React, { useState, useContext } from 'react'
import { Dialog, DialogActions, Button, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { tasksRef, listsRef, fieldValue } from '../../firebase';
import { NotificationsContext } from '../../providers/NotificationsProvider';

export default function TaskEdit({ id, open, onClose, list, title }) {
    const { showMessage } = useContext(NotificationsContext)
    const deleteTask = () => {
        list && listsRef.doc(list).set({ tasks: fieldValue.arrayRemove(id) }, { merge: true })
            .catch(error => { console.log(error); showMessage(error.message, 'error') })
        tasksRef.doc(id).delete()
            .then(() => showMessage('Task deleted', 'info'))
            .catch(error => { console.log(error); showMessage(error.message, 'error') })
    };

    const [deleteDialog, setDeleteDialog] = useState(false);
    const handleDeleteDialog = () => setDeleteDialog(!deleteDialog)

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogActions>
                    <Button endIcon={<DeleteIcon />} onClick={handleDeleteDialog}>Delete Task</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteDialog} onClose={handleDeleteDialog}>
                <DialogTitle>Delete this task?</DialogTitle>
                <DialogContent>
                    <DialogContentText>{title}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialog}>Cancel</Button>
                    <Button color="primary" variant="contained" endIcon={<DeleteIcon />} onClick={deleteTask}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
