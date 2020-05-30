import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import axios from 'axios';
import {
    Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
// import { DisplayFormikState } from './formikHelper';

const styles = {

};

// const contactFormEndpoint = process.env.REACT_APP_CONTACT_ENDPOINT;


function Contact(props) {
    const { classes } = props;
    const [open, setOpen] = useState(false);
    const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);

    function handleClose() {
        setOpen(false);
    }

    function handleClickOpen() {
        setSubmitionCompleted(false);
        setOpen(true);
    }

    return (
        <React.Fragment>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Contact us!
      </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                {!isSubmitionCompleted &&
                    <React.Fragment>
                        <DialogTitle id="form-dialog-title">Contact</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Send us a comment!
              </DialogContentText>
                            <Formik
                                initialValues={{ email: '', name: '', comment: '' }}
                                onSubmit={(values, actions) => {
                                    actions.setSubmitting(true);
                                    console.log(values)
                                    setSubmitionCompleted(true);
                                    console.log(actions)
                                }}

                                validationSchema={Yup.object().shape({
                                    email: Yup.string()
                                        .email()
                                        .required('Required'),
                                    name: Yup.string()
                                        .required('Required')
                                        .min(5, 'Name must be at least 5 symbols'),
                                    comment: Yup.string()
                                        .required('Required'),
                                })}
                            >
                                {(props) => {
                                    const {
                                        values,
                                        touched,
                                        errors,
                                        dirty,
                                        isSubmitting,
                                        handleSubmit,
                                        handleReset,
                                        getFieldProps
                                    } = props;
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <TextField
                                                label="name"
                                                className={classes.textField}
                                                id="name"
                                                helperText={(errors.name && touched.name) && errors.name}
                                                margin="normal"
                                                // value={values.name}
                                                // onChange={handleChange}
                                                // onBlur={handleBlur}
                                                {...getFieldProps('name')}
                                            />

                                            <TextField
                                                error={errors.email && touched.email}
                                                label="email"
                                                id="email"
                                                className={classes.textField}
                                                {...getFieldProps('email')}
                                                helperText={(errors.email && touched.email) && errors.email}
                                                margin="normal"
                                            />

                                            <TextField
                                                label="comment"
                                                id="comment"
                                                className={classes.textField}
                                                {...getFieldProps('comment')}
                                                helperText={(errors.comment && touched.comment) && errors.comment}
                                                margin="normal"
                                            />
                                            {JSON.stringify(errors)}
                                            {JSON.stringify(touched)}
                                            <DialogActions>
                                                <Button
                                                    type="button"
                                                    className="outline"
                                                    onClick={handleReset}
                                                    disabled={!dirty || isSubmitting}
                                                >
                                                    Reset
                        </Button>
                                                <Button type="submit" disabled={isSubmitting}>
                                                    Submit
                        </Button>
                                                {/* <DisplayFormikState {...props} /> */}
                                            </DialogActions>
                                        </form>
                                    );
                                }}
                            </Formik>
                        </DialogContent>
                    </React.Fragment>
                }
                {isSubmitionCompleted &&
                    <React.Fragment>
                        <DialogTitle id="form-dialog-title">Thanks!</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Thanks
              </DialogContentText>
                            <DialogActions>
                                <Button
                                    type="button"
                                    className="outline"
                                    onClick={handleClose}
                                >
                                    Back to app
                  </Button>
                                {/* <DisplayFormikState {...props} /> */}
                            </DialogActions>
                        </DialogContent>
                    </React.Fragment>}
            </Dialog>
        </React.Fragment >
    );
}

export default withStyles(styles)(Contact);