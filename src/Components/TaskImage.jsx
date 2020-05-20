import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { IconButton } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ImageIcon from '@material-ui/icons/Image';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    cover: {
        position: 'relative'
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
}));


export default function TaskDetails({ isOpenImg, handleCloseImg, image }) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Dialog open={isOpenImg} onClose={handleCloseImg} maxWidth="md" fullWidth scroll="body" fullScreen={fullScreen}>
            <div className={classes.cover}>
                {image && <img src={image} className={classes.img} alt="task" />}
                <IconButton className={classes.topRight} onClick={handleCloseImg}><CloseIcon /></IconButton>
                <IconButton className={classes.bottomRight} ><ImageIcon /></IconButton>
                <Typography className={classes.bottomLeft} variant="subtitle2">in list: To DO</Typography>
            </div>
        </Dialog >
    )
}