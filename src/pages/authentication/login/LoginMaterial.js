import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signIn } from '../../../helpers/signInHelper.js';
import { createCookie } from '../../../services/cookie.config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    marginTop: theme.spacing(4),
  },
  submit: {
    backgroundColor: '#3f51b5',

    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  var token, user_name, user_phone_no;
  const history = useHistory();
  const [user, setUser] = useState({});
  const [userIDFromSession, setUserIDFromSession] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  function handleSubmit(event) {
    event.preventDefault();
    const user = { username, password };

    signIn(user)
      .then((response) => {
        return response;
      })
      .then((data) => {
        var arrayUserInfo = data.data.data;
        arrayUserInfo.map((item, index) => {
          if (index === 0) {
            token = item.token;
            user_name = item.userName;
            user_phone_no = item.phno;

            // Store user information in session storage.
            sessionStorage.setItem('user_name', user_name);
            sessionStorage.setItem('user_phone_no', user_phone_no);
            sessionStorage.setItem('token', token);

            // Store user info into cookies
            createCookie('user_name', user_name, 12);
            createCookie('token', token, 12);
            createCookie('user_number', user_phone_no, 12);
          }
        });
        setUser(user);
        toast('Logged in successfully!');
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        history.push('/login');
      });
  }

  useEffect(() => {
    //Fetch username from session storage
    const fetchUserName = () => {
      if (sessionStorage.getItem('user_name')) {
        setUserIDFromSession(sessionStorage.getItem('user_id'));
      } else {
        setUserIDFromSession('');
      }
    };
    fetchUserName();
  }, []);
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper} onSubmit={handleSubmit}>
        {/* onSubmit={handleSubmit} in form */}
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='User ID'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            style={{ color: '#fff' }}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/signup' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
