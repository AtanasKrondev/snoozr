import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { FormControl, Button, Grid } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { UserContext } from '../../providers/UserProvider';

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'row',
    },
    avatar: {
        margin: theme.spacing(1),
    }
}));

export default function CommentForm() {
    const classes = useStyles();
    const { user } = useContext(UserContext)

    return (
        <div className={classes.form} >
            {user.photoURL ?
                <Avatar alt={user.displayName} src={user.photoURL} className={classes.avatar} />
                : <Avatar className={classes.avatar}>{user.displayName && user.displayName[0]} </Avatar>
            }
            <FormControl fullWidth>
                <TextField
                    fullWidth
                    placeholder="Write your comment..."
                    multiline
                    rows={1}
                    rowsMax={4}
                />
                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                    <Button endIcon={<SendIcon />} color="primary">Send</Button>
                </Grid>
            </FormControl>
        </div>
    )
}