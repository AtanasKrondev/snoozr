import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { IconButton, FormControl, InputLabel, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.background.default,
        maxWidth: 345,
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
}));

export default function TaskCardForm({ listId }) {
    const classes = useStyles();

    return (
        <Card raised className={classes.root} >
            <FormControl fullWidth >
                <InputLabel htmlFor={`addTask${listId}`} variant="filled">Add Task</InputLabel>
                <OutlinedInput className={classes.input} id={`addTask${listId}`} type="text"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton><AddIcon /></IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Card >
    );
}