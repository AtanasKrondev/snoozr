import React from 'react';
import MomentUtils from '@date-io/moment';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { InputAdornment, IconButton } from '@material-ui/core';
import { timeStamp, tasksRef } from '../../firebase';
import { Formik } from 'formik';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

export default function TaskDatePicker({ id, initDate, close }) {
    const dueDate = initDate ? initDate.toDate() : new Date()

    return (
        <Formik
            initialValues={{ dueDate }}
            onSubmit={({ dueDate }) => dueDate ? tasksRef.doc(id)
                .set({ dueDate: timeStamp.fromDate(dueDate) }, { merge: true })
                .then(() => close())
                .catch(error => console.error(error)) :
                tasksRef.doc(id)
                    .set({ dueDate: null }, { merge: true })
                    .then(() => close())
                    .catch(error => console.error(error))
            }>
            {({ values, setFieldValue, handleSubmit }) => (
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker
                        autoOk
                        ampm={false}
                        disablePast
                        showTodayButton
                        value={values.dueDate}
                        onChange={value => setFieldValue('dueDate', value.toDate())}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <DateRangeIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton size="small" onClick={handleSubmit}><SaveIcon /></IconButton>
                    <IconButton size="small" onClick={() => setFieldValue('dueDate', null)}><DeleteIcon /></IconButton>
                </MuiPickersUtilsProvider >)}
        </Formik >
    );
}