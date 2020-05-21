import React from 'react';
import { Grid, Card, makeStyles, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(3),
    },
}))

export default function BoardCardForm() {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card raised className={classes.card} variant="outlined">
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
        </Grid>
    )
}