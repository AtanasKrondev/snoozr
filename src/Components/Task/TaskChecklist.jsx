import React, { useState } from 'react';
import { FormControl, Typography, IconButton, FormGroup, FormControlLabel, Checkbox, TextField, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { Formik, FieldArray } from 'formik';
import { tasksRef, fieldValue } from '../../firebase';
import { item } from '../../vaildators';

const useStyles = makeStyles({ checklistAdd: { display: 'flex' }, })

export default function TaskChecklist({ checklist, id }) {
    const classes = useStyles();
    const [editChecklist, setEditChecklist] = useState(false);
    const handleEditChecklist = () => setEditChecklist(!editChecklist);

    return (<>
        <FormControl>
            <Typography variant="body1" component="h3">Checklist ({checklist.filter(a => a.checked).length}/{checklist.length})
                {editChecklist ?
                    <IconButton size="small" onClick={handleEditChecklist}><CloseIcon /></IconButton>
                    : <IconButton size="small" onClick={handleEditChecklist}>
                        {checklist ? <EditIcon /> : <AddIcon />}</IconButton>}
            </Typography>
            <FormGroup>
                <Formik
                    initialValues={{ checklist }}
                    onSubmit={({ checklist }) => tasksRef.doc(id)
                        .set({ checklist }, { merge: true })
                        .catch(error => console.log(error))}>
                    {(props) => <FieldArray
                        name="checklist"
                        render={arrayHelpers => (<>
                            {props.values.checklist && props.values.checklist.length > 0 &&
                                props.values.checklist.map(({ item, checked }, index) => (<FormControlLabel
                                    key={index}
                                    name={`checklist.${index}`}
                                    checked={checked}
                                    control={<Checkbox
                                    />}
                                    label={item}
                                    onChange={() => {
                                        arrayHelpers.replace(index, { item, checked: !checked })
                                        props.handleSubmit()
                                    }}
                                />))}
                        </>)} />
                    }
                </Formik>
            </FormGroup>
        </FormControl>
        {
            editChecklist &&
            <Formik
                initialValues={{ item: '' }}
                onSubmit={({ item }) => {
                    tasksRef.doc(id)
                        .set({ checklist: fieldValue.arrayUnion({ item, checked: false }) }, { merge: true })
                        .catch(error => console.log(error))
                }}
                validationSchema={item}>
                {({ touched, errors, getFieldProps, handleSubmit }) => (
                    <form className={classes.checklistAdd} onSubmit={handleSubmit}>
                        <TextField
                            id="item"
                            error={touched.item && !!errors.item}
                            helperText={errors.item}
                            {...getFieldProps('item')}
                        />
                        <IconButton size="small" type="submit">
                            <AddIcon />
                        </IconButton>
                        <IconButton size="small" onClick={handleEditChecklist}>
                            <CloseIcon />
                        </IconButton>
                    </form>)}
            </Formik>
        }
    </>)
}