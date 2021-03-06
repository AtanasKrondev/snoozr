import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { auth } from '../../firebase';
import { userCredentials } from '../../vaildators';
import { useContext } from 'react';
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const { showMessage } = useContext(NotificationsContext)

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
        </Typography>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={({ email, password }) => {
          auth.signInWithEmailAndPassword(email, password)
            .then(({ user }) => showMessage(`Welcome back, ${user.displayName}`, 'success'))
            .then(() => history.push('/'))
            .catch(error => {
              console.log(error);
              showMessage(error.message, 'error')
            })
        }}
        validationSchema={userCredentials}
      >{({ touched, errors, getFieldProps, handleSubmit, isValid, dirty }) => (
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
            label="Password"
            type="password"
            autoComplete="current-password"
            error={!!touched.password && !!errors.password}
            helperText={(touched.password && errors.password) && errors.password}
            {...getFieldProps('password')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!dirty || !isValid}
          >
            Sign In
          </Button>
        </form>
      )}
      </Formik>
      <Link to="/signup" className={classes.link} >
        {"Don't have an account? Sign Up"}
      </Link>
    </Container >
  );
}