import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TaskList from '../Task/TaskList';
import TaskListForm from '../Task/TaskListForm';
import Container from '@material-ui/core/Container';
import { useParams, useHistory } from 'react-router-dom';
import { boardsRef } from '../../firebase';
import { Typography, LinearProgress, IconButton, TextField, Box } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { title } from '../../vaildators';
import { Formik } from 'formik';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'scroll',
        height: '85vh',
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.dark,
            borderRadius: '0.8em'
        }
    },
    title: {
        paddingLeft: theme.spacing(3)
    }
}));

export default function Board() {
    const { id } = useParams();
    const classes = useStyles();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [editTitle, setEditTitle] = useState(false);
    const handleEditTitle = () => setEditTitle(!editTitle);

    useEffect(() => boardsRef.doc(id).onSnapshot(snapshot => {
        setLoading(true)
        if (snapshot.exists) {
            const data = snapshot.data();
            setBoard({ id, ...data });
            setLoading(false);
        } else history.push('/404')
    }, error => console.error(error)), [id, history])

    return (<>{loading ? <LinearProgress color="secondary" /> : <>
        <Box className={classes.title}>
            {editTitle ?
                <Formik
                    initialValues={{ title: board.title || '' }}
                    onSubmit={({ title }) => {
                        boardsRef.doc(id).set({ title }, { merge: true })
                            .then(() => handleEditTitle())
                            .catch(error => console.log(error))
                    }}
                    validationSchema={title}>
                    {({ touched, errors, getFieldProps, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                id="boardTitle"
                                error={touched.title && !!errors.title}
                                helperText={errors.title}
                                {...getFieldProps('title')}
                            />
                            <IconButton size="small" type="submit"><SaveIcon /></IconButton>
                            <IconButton size="small" onClick={handleEditTitle}><CloseIcon /></IconButton>
                        </form>)}
                </Formik> :
                <Typography component="h1" variant="h6">{board && board.title}
                    <IconButton size="small" onClick={handleEditTitle}><EditIcon /></IconButton>
                </Typography>}
        </Box>
        <Container className={classes.root}>
            {board.lists && board.lists.sort((a, b) => a.position - b.position)
                .map(({ id }) => (<TaskList key={id} id={id}></TaskList>))}
            < TaskListForm boardId={id} />
        </ Container></>}
    </>
    )
}