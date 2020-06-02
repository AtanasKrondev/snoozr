import React, { useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { auth, db } from '../../firebase';
import { UserContext } from '../../providers/UserProvider';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import { ButtonGroup, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'scroll',
        height: '86vh',
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

    return (
        <Container maxWidth="xs" className={classes.root}>
            {user.photoURL ? <Avatar className={classes.avatar} alt={user.displayName} src={user.photoURL} /> :
                <Avatar>{user.displayName[0]}</Avatar>}
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
                                .then(() => db.collection('users').doc(user.uid).set({ displayName, photoURL }, { merge: true }))
                                .catch(error => console.error(error))
                        }}
                        validationSchema={Yup.object().shape({
                            displayName: Yup.string()
                                .required('Name is required')
                                .min(3, 'Name must be at least 3 symbols'),
                            photoURL: Yup.string()
                                .matches('^https?://.*.(jpe?g|png|gif)$', 'Invalid image URL format'),
                        })}
                    >{({ touched, errors, getFieldProps, handleSubmit, handleReset }) => (
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
                                <Button type="submit" startIcon={<SaveIcon />}>Update</Button>
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
                        initialValues={{ email: user.email, passwordE: '' }}
                        onSubmit={({ email, passwordE }, { resetForm }) => {
                            auth.signInWithEmailAndPassword(user.email, passwordE)
                                .then(() => auth.currentUser.updateEmail(email))
                                .catch(error => console.error(error));
                            resetForm();
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .required('E-mail is required')
                                .email('Invalid E-mail format'),
                            passwordE: Yup.string()
                                .required('Password is required')
                                .min(6, 'Password must be at least 6 symbols'),
                        })}
                    >{({ touched, errors, getFieldProps, handleSubmit, handleReset }) => (
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
                                id="passwordE"
                                label="Current Password"
                                type="password"
                                autoComplete="current-password"
                                error={!!touched.passwordE && !!errors.passwordE}
                                helperText={(touched.passwordE && errors.passwordE) && errors.passwordE}
                                {...getFieldProps('passwordE')}
                            />
                            <ButtonGroup fullWidth variant="contained" color="primary">
                                <Button startIcon={<UndoIcon />} onClick={handleReset}>Reset</Button>
                                <Button type="submit" startIcon={<SaveIcon />}>Update</Button>
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
                                .then(() => auth.currentUser.updatePassword(newPassword))
                                .catch(error => console.error(error))
                            resetForm();
                        }}
                        validationSchema={Yup.object().shape({
                            passwordC: Yup.string()
                                .required('Current password is required')
                                .min(6, 'Password must be at least 6 symbols'),
                            newPassword: Yup.string()
                                .required('New password is required')
                                .min(6, 'Password must be at least 6 symbols'),
                            rePassword: Yup.string()
                                .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
                        })}
                    >{({ touched, errors, getFieldProps, handleSubmit, handleReset }) => (
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
                                <Button type="submit" startIcon={<SaveIcon />}>Update</Button>
                            </ButtonGroup>
                        </form>
                    )}
                    </Formik>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Container >
    );
}
