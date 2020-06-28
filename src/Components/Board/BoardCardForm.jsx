import React, { useContext } from 'react';
import { Card, makeStyles, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Formik } from 'formik';
import { boardsRef, usersRef, fieldValue } from '../../firebase'
import { UserContext } from '../../providers/UserProvider';
import { title } from '../../vaildators';
import { NotificationsContext } from '../../providers/NotificationsProvider';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(3),
    },
}))

export default function BoardCardForm({ card }) {
    const classes = useStyles();
    const { user } = useContext(UserContext);
    const { showMessage } = useContext(NotificationsContext)

    return (
        <Card elevation={0} className={card && classes.card}>
            <Formik
                initialValues={{ title: '' }}
                onSubmit={({ title }) => {
                    const author = user ? user.uid : '';
                    boardsRef.add({ title, author, lists: [] })
                        .then(({ id }) => usersRef.doc(author).set({ boards: fieldValue.arrayUnion(id) }, { merge: true }))
                        .catch(error => { console.log(error); showMessage(error.message, 'error') })
                }}
                validationSchema={title}>
                {({ touched, errors, getFieldProps, handleSubmit, isValid, dirty }) => (
                    <FormControl fullWidth error={touched.title && !!errors.title}>
                        <InputLabel htmlFor="title" variant="filled">Add Board</InputLabel>
                        <OutlinedInput id={card ? 'titleCard' : 'titleList'} type="text"
                            {...getFieldProps('title')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton disabled={!isValid || !dirty}
                                        onClick={handleSubmit}><AddIcon /></IconButton>
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