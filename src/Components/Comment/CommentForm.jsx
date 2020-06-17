import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { FormControl, Button, Grid } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { UserContext } from '../../providers/UserProvider';
import { Formik } from 'formik';
import { comment as commentSchema } from '../../vaildators';
import { commentsRef, fieldValue } from '../../firebase';

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'row',
    },
    avatar: {
        margin: theme.spacing(1),
    }
}));

export default function CommentForm({ task }) {
    const classes = useStyles();
    const { user } = useContext(UserContext)

    return (
        <div className={classes.form} >
            {user.photoURL ?
                <Avatar alt={user.displayName} src={user.photoURL} className={classes.avatar} />
                : <Avatar className={classes.avatar}>{user.displayName && user.displayName[0]} </Avatar>
            }
            <Formik
                initialValues={{ comment: '' }}
                validationSchema={commentSchema}
                onSubmit={({ comment }, { resetForm }) => {
                    commentsRef.add({ comment, author: user.uid, task, timestamp: fieldValue.serverTimestamp() })
                        .then(() => resetForm())
                        .catch(error => console.error(error))
                }}>
                {({ touched, errors, getFieldProps, handleSubmit }) => (
                    <FormControl fullWidth>
                        <TextField
                            fullWidth
                            id="comment"
                            error={touched.comment && !!errors.comment}
                            placeholder="Write your comment..."
                            multiline
                            rows={1}
                            rowsMax={4}
                            helperText={errors.comment}
                            {...getFieldProps('comment')}
                        />
                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                            <Button onClick={handleSubmit} endIcon={<SendIcon />} color="primary">Send</Button>
                        </Grid>
                    </FormControl>
                )}
            </Formik>
        </div>
    )
}