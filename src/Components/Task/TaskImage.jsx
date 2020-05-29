import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { IconButton, FormControl, InputLabel, InputAdornment, OutlinedInput } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PublishIcon from '@material-ui/icons/Publish';
import CloseIcon from '@material-ui/icons/Close';

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


export default function TaskDetails({ isOpenImg, handleCloseImg, image }) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Dialog open={isOpenImg} onClose={handleCloseImg} maxWidth="md" scroll="body" fullScreen={fullScreen}>
            <div className={classes.cover}>
                {image && <img src={image} className={classes.img} alt="task" />}
                <IconButton className={classes.topRight} onClick={handleCloseImg}><CloseIcon /></IconButton>
            </div>
            <FormControl fullWidth className={classes.form}>
                <InputLabel htmlFor="uploadImage" variant="filled">Upload Image</InputLabel>
                <OutlinedInput id="uploadImage" type="text" fullWidth endAdornment={
                    <InputAdornment position="end">
                        <IconButton><PublishIcon /></IconButton>
                    </InputAdornment>
                } />
            </FormControl>
        </Dialog >
    )
}