import React, { useContext } from 'react';
import { Formik } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { auth, usersRef } from '../../firebase';
import { UserContext } from '../../providers/UserProvider';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import { ButtonGroup, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { userProfile, userCredentials, changePassword } from '../../vaildators';
import { NotificationsContext } from '../../providers/NotificationsProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    expansion: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.3%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const { user } = useContext(UserContext)
    const { showMessage } = useContext(NotificationsContext)

    return (
        <Container maxWidth="xs" className={classes.root}>
            {user.photoURL ? <Avatar className={classes.avatar} alt={user.displayName} src={user.photoURL} /> :
                <Avatar>{user.displayName && user.displayName[0]}</Avatar>}
            <Typography component="h1" variant="h5">{user.displayName}</Typography>
            <ExpansionPanel className={classes.expansion}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Profile</Typography>
                    <Typography className={classes.secondaryHeading}>Name and photo</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Formik
                        initialValues={{ displayName: user.displayName || '', photoURL: user.photoURL || '' }}
                        onSubmit={({ displayName, photoURL }) => {
                            auth.currentUser.updateProfile({ displayName, photoURL })
                                .then(() => {
                                    usersRef.doc(user.uid).set({ displayName, photoURL }, { merge: true })
                                        .then(() => showMessage('Update successful!', 'info'))
                                        .catch(error => { console.log(error); showMessage(error.message, 'error') })
                                })
                                .catch(error => { console.log(error); showMessage(error.message, 'error') })
                        }}
                        validationSchema={userProfile}
                    >{({ touched, errors, getFieldProps, handleSubmit, handleReset, dirty, isValid }) => (
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <TextField
                                autoComplete="name"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                autoFocus
                                id="displayName"
                                label="Full Name"
                                error={touched.displayName && !!errors.displayName}
                                helperText={(touched.displayName && errors.displayName) && errors.displayName}
                                {...getFieldProps('displayName')}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                autoComplete="photo"
                                id="photoURL"
                                label="Photo URL"
                                error={touched.photoURL && !!errors.photoURL}
                                helperText={(touched.photoURL && errors.photoURL) && errors.photoURL}
                                {...getFieldProps('photoURL')}
                            />
                            <ButtonGroup fullWidth variant="contained" color="primary">
                                <Button startIcon={<UndoIcon />} onClick={handleReset}>Reset</Button>
                                <Button type="submit" disabled={!dirty || !isValid} startIcon={<SaveIcon />}>Update</Button>
                            </ButtonGroup>
                        </form>
                    )}
                    </Formik>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className={classes.expansion}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Email</Typography>
                    <Typography className={classes.secondaryHeading}>Requires reauthentication</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Formik
                        initialValues={{ email: user.email, password: '' }}
                        onSubmit={({ email, password }, { resetForm }) => {
                            auth.signInWithEmailAndPassword(user.email, password)
                                .then(() => {
                                    auth.currentUser.updateEmail(email)
                                        .then(() => showMessage('Update successful!', 'info'))
                                        .catch(error => { console.log(error); showMessage(error.message, 'error') })
                                })
                                .catch(error => { console.log(error); showMessage(error.message, 'error') })
                            resetForm();
                        }}
                        validationSchema={userCredentials}
                    >{({ touched, errors, getFieldProps, handleSubmit, handleReset, isValid, dirty }) => (
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                autoComplete="email"
                                error={touched.email && !!errors.email}
                                helperText={(touched.email && errors.email) && errors.email}
                                {...getFieldProps('email')}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Current Password"
                                type="password"
                                autoComplete="current-password"
                                error={!!touched.password && !!errors.password}
                                helperText={(touched.password && errors.password) && errors.password}
                                {...getFieldProps('password')}
                            />
                            <ButtonGroup fullWidth variant="contained" color="primary">
                                <Button startIcon={<UndoIcon />} onClick={handleReset}>Reset</Button>
                                <Button type="submit" disabled={!dirty || !isValid} startIcon={<SaveIcon />}>Update</Button>
                            </ButtonGroup>
                        </form>
                    )}
                    </Formik>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className={classes.expansion}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Password</Typography>
                    <Typography className={classes.secondaryHeading}>Requires reauthentication</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Formik
                        initialValues={{ passwordC: '', newPassword: '', rePassword: '' }}
                        onSubmit={({ passwordC, newPassword }, { resetForm }) => {
                            auth.signInWithEmailAndPassword(user.email, passwordC)
                                .then(() => auth.currentUser.updatePassword(newPassword)
                                    .then(() => showMessage('Update successful!', 'info'))
                                    .catch(error => { console.log(error); showMessage(error.message, 'error') }))
                                .catch(error => { console.log(error); showMessage(error.message, 'error') })
                            resetForm();
                        }}
                        validationSchema={changePassword}
                    >{({ touched, errors, getFieldProps, handleSubmit, handleReset, isValid, dirty }) => (
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="passwordC"
                                label="Current Password"
                                type="password"
                                autoComplete="current-password"
                                error={!!touched.passwordC && !!errors.passwordC}
                                helperText={(touched.passwordC && errors.passwordC) && errors.passwordC}
                                {...getFieldProps('passwordC')}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="newPassword"
                                label="New Password"
                                type="password"
                                error={!!touched.newPassword && !!errors.newPassword}
                                helperText={(touched.newPassword && errors.newPassword) && errors.newPassword}
                                {...getFieldProps('newPassword')}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="rePassword"
                                label="Confirm New Password"
                                type="password"
                                error={!!touched.rePassword && !!errors.rePassword}
                                helperText={(touched.rePassword && errors.rePassword) && errors.rePassword}
                                {...getFieldProps('rePassword')}
                            />
                            <ButtonGroup fullWidth variant="contained" color="primary">
                                <Button startIcon={<UndoIcon />} onClick={handleReset}>Reset</Button>
                                <Button type="submit" disabled={!isValid || !dirty} startIcon={<SaveIcon />}>Update</Button>
                            </ButtonGroup>
                        </form>
                    )}
                    </Formik>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container >
    );
}
