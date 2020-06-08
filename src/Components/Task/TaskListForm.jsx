import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, FormHelperText } from '@material-ui/core';
import { IconButton, FormControl, InputLabel, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { boardsRef, listsRef, fieldValue } from '../../firebase';
import { UserContext } from '../../providers/UserProvider';

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
                initialValues={{ listTitle: '' }}
                onSubmit={({ listTitle }) => {
                    const author = user ? user.uid : '';
                    const addList = listsRef.add({ title: listTitle, tasks: [], author, taskCount: 0 });
                    const lastPosition = board.set({ listCount: fieldValue.increment(1) }, { merge: true });
                    Promise.all([addList, lastPosition])
                        .then(
                            ([{ id }]) => board.get()
                                .then(board => board.data().listCount)
                                .then(position => board.set({ lists: fieldValue.arrayUnion({ id, position }) }, { merge: true }))
                        )
                        .catch(error => console.error(error))
                }}
                validationSchema={Yup.object().shape({
                    listTitle: Yup.string()
                        .required('Enter a title')
                })}>
                {({ touched, errors, getFieldProps, handleSubmit }) => (
                    <FormControl fullWidth error={touched.listTitle && !!errors.listTitle} >
                        <InputLabel htmlFor="listTitle" variant="filled">Add List</InputLabel>
                        <OutlinedInput id="listTitle" type="text" className={classes.input}
                            {...getFieldProps('listTitle')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSubmit}><AddIcon /></IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText>{errors.listTitle}</FormHelperText>
                    </FormControl>
                )}
            </Formik>
        </Paper >
    );
}