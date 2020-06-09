import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { IconButton, FormControl, InputLabel, InputAdornment, FormHelperText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Formik } from 'formik';
import { title } from '../../vaildators'
import { listsRef, tasksRef, fieldValue } from '../../firebase';
import { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.background.default,
        maxWidth: 345,
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
}));

export default function TaskCardForm({ listId }) {
    const classes = useStyles();
    const list = listsRef.doc(listId);
    const { user } = useContext(UserContext)

    return (
        <Card raised className={classes.root} >
            <Formik
                initialValues={{ title: '' }}
                onSubmit={({ title }) => {
                    const author = user ? user.uid : '';
                    const addTask = tasksRef.add({ title, author });
                    const lastPosition = list.set({ taskCount: fieldValue.increment(1) }, { merge: true });
                    Promise.all([addTask, lastPosition])
                        .then(
                            ([{ id }]) => list.get()
                                .then(list => list.data().taskCount)
                                .then(position => list.set({ tasks: fieldValue.arrayUnion({ id, position }) }, { merge: true }))
                        )
                        .catch(error => console.error(error))
                }}
                validationSchema={title}>
                {({ touched, errors, getFieldProps, handleSubmit }) => (
                    <FormControl fullWidth error={touched.title && !!errors.title} >
                        <InputLabel htmlFor={`title${listId}`} variant="filled">Add Task</InputLabel>
                        <OutlinedInput id={`title${listId}`} type="text" className={classes.input}
                            {...getFieldProps('title')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSubmit}><AddIcon /></IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText>{errors.title}</FormHelperText>
                    </FormControl>
                )}
            </Formik>
        </Card >
    );
}