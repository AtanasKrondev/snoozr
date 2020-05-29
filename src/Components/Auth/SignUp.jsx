import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'scroll',
    height: '90vh',
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

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
        </Typography>
      <form className={classes.form} noValidate>
        <TextField
          autoComplete="name"
          name="name"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Full Name"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="photo"
          label="Photo URL"
          name="photo"
          autoComplete="photo"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
        // autoComplete="current-password"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="rePassword"
          label="Repeat Password"
          type="password"
          id="rePassword"
        // autoComplete="current-password"
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
    </Container>
  );
}