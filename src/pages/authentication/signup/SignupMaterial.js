import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signUp } from '../../../helpers/signupHelper';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    backgroundColor: '#3f51b5',
    color: '#fff',
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const history = useHistory();
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  // OnSubmit Method for Submit Button
  const onSubmit = (event) => {
    event.preventDefault();
    const user = {
      userName: userName,
      phoneNumber: phoneNumber,
      userID: userID,
      password: password,
    };
    signUp(user)
      .then((data) => {
        if (data.status === 'success') {
          sessionStorage.setItem('user_id', userID);
        } else {
          console.log(data);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        {/* onSubmit={handleSubmit} in form */}
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Full Name'
                name='lastName'
                autoComplete='lname'
                onChange={(event) => setUserName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Phone Number'
                name='email'
                autoComplete='email'
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='User ID'
                name='email'
                autoComplete='email'
                onChange={(event) => setUserID(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='password'
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
