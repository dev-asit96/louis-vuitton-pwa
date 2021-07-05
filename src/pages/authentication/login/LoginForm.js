// Login Page -------- Child Component.

import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import Background from '../../../assets/clothingBackground.jpg';
import { signIn } from '../../../helpers/signInHelper.js.js';
import Layout from '../../../components/Layout';
import { createCookie } from '../../../services/cookie.config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  var token, user_name, user_phone_no;
  const history = useHistory();
  // UseState to store user inputs data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  const onSubmit = (event) => {
    event.preventDefault();
    const user = { username, password };

    // User data should be verified through login API.
    signIn(user)
      .then((response) => {
        return response;
      })
      .then((data) => {
        console.log(data);
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
      });

    history.push('/');
  };

  /* Login Form */
  return (
    <Layout title='Login' description='You should login to validate yourself'>
      <div>
        <div className='text-center'>
          <h1>Login</h1>
        </div>
        {/* Side Image */}
        <div className='row'>
          <div className='flex-container'>
            <form className='fsection'>
              {/* User Name */}
              <div className='form-group'>
                <TextField
                  onChange={({ target }) => setUsername(target.value)}
                  id='standard-basic'
                  label='User ID'
                />
              </div>

              {/* Password field */}
              <div className='form-group'>
                <TextField
                  type='password'
                  placeholder='Password'
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>

              {/* Submit Button*/}
              <Button
                className='btn btn-outline-secondary'
                type='submit'
                onClick={onSubmit}
                variant='outlined'
                color='default'
                size='medium'
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginForm;
