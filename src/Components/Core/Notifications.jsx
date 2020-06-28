import React, { useContext } from 'react';
import { NotificationsContext } from '../../providers/NotificationsProvider';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export default function Notifications() {
    const { message, open, severity, setOpen } = useContext(NotificationsContext)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}>
            <MuiAlert variant="filled" severity={severity} onClose={handleClose}>{message}</MuiAlert>
        </Snackbar >
    )
}