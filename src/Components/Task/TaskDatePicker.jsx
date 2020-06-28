import React, { useContext } from 'react';
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
import { NotificationsContext } from '../../providers/NotificationsProvider';

export default function TaskDatePicker({ id, initDate, close }) {
    const dueDate = initDate ? initDate.toDate() : new Date()
    const { showMessage } = useContext(NotificationsContext)

    return (
        <Formik
            initialValues={{ dueDate }}
            onSubmit={({ dueDate }) => dueDate ? tasksRef.doc(id)
                .set({ dueDate: timeStamp.fromDate(dueDate) }, { merge: true })
                .then(() => close())
                .catch(error => { console.log(error); showMessage(error.message, 'error') }) :
                tasksRef.doc(id)
                    .set({ dueDate: null }, { merge: true })
                    .then(() => close())
                    .catch(error => { console.log(error); showMessage(error.message, 'error') })

            }>
            {({ values, setFieldValue, handleSubmit, isValid, dirty }) => (
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
                    <IconButton size="small" onClick={handleSubmit} disabled={!isValid || !dirty}><SaveIcon /></IconButton>
                    <IconButton size="small" onClick={() => setFieldValue('dueDate', null)}><DeleteIcon /></IconButton>
                </MuiPickersUtilsProvider >)}
        </Formik >
    );
}