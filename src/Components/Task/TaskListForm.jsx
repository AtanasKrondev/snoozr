import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, FormHelperText } from '@material-ui/core';
import { IconButton, FormControl, InputLabel, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Formik } from 'formik';
import { boardsRef, listsRef, fieldValue } from '../../firebase';
import { UserContext } from '../../providers/UserProvider';
import { title } from '../../vaildators';
import { NotificationsContext } from '../../providers/NotificationsProvider';

const useStyles = makeStyles((theme) => ({
    list: {
        margin: theme.spacing(1),
        flexShrink: 0,
        flexGrow: 1,
        width: 300,
        maxWidth: 300,
    },
    input: {
        background: theme.palette.background.default,
    }
}));

export default function TaskListForm({ boardId }) {
    const classes = useStyles();
    const board = boardsRef.doc(boardId);
    const { user } = useContext(UserContext);
    const { showMessage } = useContext(NotificationsContext);

    return (
        <Paper className={classes.list} >
            <Formik
                initialValues={{ title: '' }}
                onSubmit={({ title }) => {
                    const author = user ? user.uid : '';
                    listsRef.add({ title, tasks: [], author })
                        .then(({ id }) => board.set({ lists: fieldValue.arrayUnion(id) }, { merge: true }))
                        .catch(error => { console.log(error); showMessage(error.message, 'error') })
                }}
                validationSchema={title}>
                {({ touched, errors, getFieldProps, handleSubmit, isValid, dirty }) => (
                    <FormControl fullWidth error={touched.title && !!errors.title} >
                        <InputLabel htmlFor="title" variant="filled">Add List</InputLabel>
                        <OutlinedInput id="title" type="text" className={classes.input}
                            {...getFieldProps('title')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSubmit} disabled={!isValid || !dirty}><AddIcon /></IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText>{errors.title}</FormHelperText>
                    </FormControl>
                )}
            </Formik>
        </Paper >
    );
}