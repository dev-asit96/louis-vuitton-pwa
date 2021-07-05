import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import '../../../styles.css';
import LoginForm from './LoginForm';
import LoginMaterial from './LoginMaterial';

const Login = () => {
  const [word, setWord] = useState('Parent');

  return (
    <Layout title='Login' description='You should login to validate yourself'>
      <div>
        <div>
          <h1 className='page-title-text'>Login</h1>
        </div>
        {/* <LoginForm /> */}
        <LoginMaterial />
      </div>
    </Layout>
  );
};

export default Login;
