import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { IconButton, FormControl, InputLabel, InputAdornment, OutlinedInput, FormHelperText } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PublishIcon from '@material-ui/icons/Publish';
import CloseIcon from '@material-ui/icons/Close';
import { Formik } from 'formik';
import { imageURL } from '../../vaildators';
import { tasksRef } from '../../firebase';

const useStyles = makeStyles(theme => ({
    cover: {
        position: 'relative',
        minHeight: 50,
    },
    topRight: {
        position: 'absolute',
        top: theme.spacing(0),
        right: theme.spacing(1),
        mixBlendMode: 'difference'
    },
    bottomRight: {
        position: 'absolute',
        bottom: theme.spacing(0),
        right: theme.spacing(1),
        mixBlendMode: 'difference'
    },
    bottomLeft: {
        position: 'absolute',
        bottom: theme.spacing(0),
        left: theme.spacing(1),
        mixBlendMode: 'difference'
    },
    img: {
        width: '100%',
        height: 'auto',
    },
    form: {
        background: theme.palette.background.default,
    }
}));


export default function TaskDetails({ isOpenImg, handleCloseImg, image, id }) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const task = tasksRef.doc(id);

    return (
        <Dialog open={isOpenImg} onClose={handleCloseImg} maxWidth="md" scroll="body" fullScreen={fullScreen}>
            <div className={classes.cover}>
                {image && <img src={image} className={classes.img} alt="task" />}
                <IconButton className={classes.topRight} onClick={handleCloseImg}><CloseIcon /></IconButton>
            </div>
            <Formik
                initialValues={{ image: image || '' }}
                onSubmit={({ image }) => {
                    task.set({ image }, { merge: true })
                        .catch(error => console.error(error))
                }}
                validationSchema={imageURL}
            >
                {({ touched, errors, getFieldProps, handleSubmit }) => (
                    <FormControl fullWidth className={classes.form} error={touched.image && !!errors.image}>
                        <InputLabel htmlFor={`image${id}`} variant="filled">Upload Image</InputLabel>
                        <OutlinedInput id={`image${id}`} type="text" fullWidth {...getFieldProps('image')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSubmit}><PublishIcon /></IconButton>
                                </InputAdornment>
                            } />
                        <FormHelperText>{errors.image}</FormHelperText>
                    </FormControl>)}
            </Formik>
        </Dialog >
    )
}