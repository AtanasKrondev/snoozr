import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { IconButton, FormControl, InputLabel, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles((theme) => ({
    list: {
        margin: theme.spacing(1),
        width: '300px',
        flexShrink: 0,
        flexGrow: 1,
    },
    form: {
        background: theme.palette.background.default,
    }
}));



export default function TaskListForm() {
    const classes = useStyles();

    return (
        <Paper className={classes.list} >
            <FormControl className={classes.form}>
                <InputLabel htmlFor="addList" variant="filled">Add List</InputLabel>
                <OutlinedInput id="addList" type="text"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton><AddIcon /></IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Paper >
    );
}