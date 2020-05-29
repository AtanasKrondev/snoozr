import React from 'react';
import { Card, makeStyles, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(3),
    },
}))

export default function BoardCardForm({ card }) {
    const classes = useStyles();

    return (
        <Card raised className={card && classes.card} variant="outlined">
            <FormControl fullWidth>
                <InputLabel htmlFor="addList" variant="filled">Add Board</InputLabel>
                <OutlinedInput id="addList" type="text"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton><AddIcon /></IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Card>
    )
}