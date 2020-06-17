import React, { useState } from 'react';
import { FormControl, Typography, IconButton, FormGroup, FormControlLabel, Checkbox, TextField, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import { Formik, FieldArray } from 'formik';
import { tasksRef, fieldValue } from '../../firebase';
import { item, checklist as checklistSchema } from '../../vaildators';

const useStyles = makeStyles({ checklistAdd: { display: 'flex' }, })

export default function TaskChecklist({ checklist, id }) {
    const classes = useStyles();
    const [editChecklist, setEditChecklist] = useState(false);
    const handleEditChecklist = () => setEditChecklist(!editChecklist);
    const submitHandler = ({ checklist }) => tasksRef.doc(id)
        .set({ checklist }, { merge: true })
        .catch(error => console.log(error))

    return (<>
        <FormControl>

            <Formik
                initialValues={{ checklist }}
                validationSchema={checklistSchema}
                onSubmit={submitHandler}>
                {({ values, handleSubmit, getFieldProps, errors, resetForm }) => <>
                    <Typography variant="body1" component="h3">Checklist {(checklist && checklist.length > 0)
                        && <span>({checklist.filter(a => a.checked).length} / {checklist.length})</span>}
                        {editChecklist ?
                            <>
                                <IconButton size="small" onClick={handleSubmit}><SaveIcon /></IconButton>
                                <IconButton size="small" onClick={() => {
                                    handleEditChecklist();
                                    resetForm();
                                }}><CloseIcon /></IconButton></>
                            : <IconButton size="small" onClick={handleEditChecklist}>
                                {checklist && <EditIcon />}</IconButton>}
                    </Typography>
                    <FormGroup>
                        <FieldArray
                            name="checklist"
                            render={arrayHelpers => (<>
                                {values.checklist && values.checklist.length > 0 &&
                                    values.checklist.map(({ item, checked }, index) => (<FormControlLabel
                                        key={index}
                                        name={`checklist.${index}`}
                                        checked={checked}
                                        disabled={editChecklist}
                                        control={<Checkbox
                                        />}
                                        label={editChecklist ?
                                            <form className={classes.checklistAdd} >
                                                <TextField
                                                    id={`checklist.${index}.item`}
                                                    error={errors.checklist && !!errors.checklist[index]}
                                                    helperText={errors.checklist && errors.checklist[index] && errors.checklist[index].item}
                                                    {...getFieldProps(`checklist.${index}.item`)}
                                                />
                                            </form>
                                            : item}
                                        onChange={() => {
                                            arrayHelpers.replace(index, { item, checked: !checked })
                                            handleSubmit()
                                        }}
                                    />))}
                            </>)} />
                    </FormGroup>
                </>}
            </Formik>
        </FormControl>
        <Formik
            initialValues={{ item: '' }}
            onSubmit={({ item }) => {
                tasksRef.doc(id)
                    .set({ checklist: fieldValue.arrayUnion({ item, checked: false }) }, { merge: true })
                    .catch(error => console.log(error))
            }}
            validationSchema={item}>
            {({ touched, errors, getFieldProps, handleSubmit, resetForm }) => (
                <form className={classes.checklistAdd} onSubmit={handleSubmit}>
                    <TextField
                        id="item"
                        error={touched.item && !!errors.item}
                        placeholder="Add new item"
                        helperText={errors.item}
                        {...getFieldProps('item')}
                    />
                    <IconButton size="small" type="submit">
                        <AddIcon />
                    </IconButton>
                    <IconButton size="small" onClick={resetForm}>
                        <CloseIcon />
                    </IconButton>
                </form>)}
        </Formik>
    </>)
}