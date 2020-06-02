import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { auth, db } from '../../firebase'

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
        </Typography>
      <Formik
        initialValues={{ displayName: '', photoURL: '', email: '', password: '', rePassword: '' }}
        onSubmit={({ displayName, photoURL, email, password }) => {
          auth.createUserWithEmailAndPassword(email, password)
            .then(({ user }) => db.collection('users').doc(user.uid).set({ displayName, photoURL }))
            .then(() => auth.currentUser.updateProfile({ displayName, photoURL }))
            .then(() => history.push('/profile'))
            .catch(error => console.error(error))
        }}
        validationSchema={Yup.object().shape({
          displayName: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 symbols'),
          photoURL: Yup.string()
            .matches('^https?://.*.(jpe?g|png|gif)$', 'Invalid image URL format'),
          email: Yup.string()
            .required('E-mail is required')
            .email('Invalid E-mail format'),
          password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 symbols'),
          rePassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords do not match')
        })}
      >{({ touched, errors, getFieldProps, handleSubmit }) => (
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
            label="Password"
            type="password"
            autoComplete="current-password"
            error={!!touched.password && !!errors.password}
            helperText={(touched.password && errors.password) && errors.password}
            {...getFieldProps('password')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="rePassword"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            error={!!touched.rePassword && !!errors.rePassword}
            helperText={(touched.rePassword && errors.rePassword) && errors.rePassword}
            {...getFieldProps('rePassword')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Link to="/signin" className={classes.link}>
            Already have an account? Sign In
              </Link>
        </form>
      )}
      </Formik>
    </Container >
  );
}