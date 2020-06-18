import React from 'react';
import { Formik } from 'formik';
import { commentsRef } from '../../firebase';
import { comment as commentSchema } from '../../vaildators';
import SaveIcon from '@material-ui/icons/Save';
import { TextField, IconButton } from '@material-ui/core';

export default function CommentEdit({ handleEdit, initialComment }) {
    return (<Formik
        initialValues={{ comment: initialComment.comment || '' }}
        onSubmit={({ comment }) => {
            commentsRef.doc(initialComment.id).set({ comment }, { merge: true })
                .then(() => handleEdit())
                .catch(error => console.log(error))
        }}
        validationSchema={commentSchema}>
        {({ touched, errors, getFieldProps, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
                <TextField
                    id={`commentEdit${initialComment.id}`}
                    error={touched.comment && !!errors.comment}
                    helperText={errors.comment}
                    {...getFieldProps('comment')}
                />
                <IconButton size="small" type="submit"><SaveIcon /></IconButton>
                {/* <IconButton size="small" onClick={handleEditTitle}><CloseIcon /></IconButton> */}
            </form>)}
    </Formik>)
}