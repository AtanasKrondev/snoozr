import React, { useContext } from 'react';
import { Card, makeStyles, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { boardsRef } from '../../firebase'
import { UserContext } from '../../providers/UserProvider';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(3),
    },
}))

export default function BoardCardForm({ card }) {
    const classes = useStyles();
    const { user } = useContext(UserContext);

    return (
        <Card elevation={0} className={card && classes.card}>
            <Formik
                initialValues={{ title: '' }}
                onSubmit={({ title }, { resetForm }) => {
                    const author = user ? user.uid : '';
                    boardsRef.add({ title, author, lists: [], listCount: 0 })
                        .catch(error => console.error(error))
                    resetForm();
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string()
                        .required('Enter a title')
                })}>
                {({ touched, errors, getFieldProps, handleSubmit }) => (
                    <FormControl fullWidth error={touched.title && !!errors.title}>
                        <InputLabel htmlFor="title" variant="filled">Add Board</InputLabel>
                        <OutlinedInput id={card ? 'titleCard' : 'titleList'} type="text"
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
    )
}