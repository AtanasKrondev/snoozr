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

    return (
        <Paper className={classes.list} >
            <Formik
                initialValues={{ title: '' }}
                onSubmit={({ title }) => {
                    const author = user ? user.uid : '';
                    const addList = listsRef.add({ title, tasks: [], author, taskCount: 0 });
                    const lastPosition = board.set({ listCount: fieldValue.increment(1) }, { merge: true });
                    Promise.all([addList, lastPosition])
                        .then(
                            ([{ id }]) => board.get()
                                .then(board => board.data().listCount)
                                .then(position => board.set({ lists: fieldValue.arrayUnion({ id, position }) }, { merge: true }))
                        )
                        .catch(error => console.error(error))
                }}
                validationSchema={title}>
                {({ touched, errors, getFieldProps, handleSubmit }) => (
                    <FormControl fullWidth error={touched.title && !!errors.title} >
                        <InputLabel htmlFor="title" variant="filled">Add List</InputLabel>
                        <OutlinedInput id="title" type="text" className={classes.input}
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
        </Paper >
    );
}