import React from 'react';
import '../../../styles.css';
import SignupPage from './SignupPage';
import SignupMaterial from './SignupMaterial';
import Layout from '../../../components/Layout';

const Signup = () => {
  return (
    <Layout title='Signup' description='You should signup to validate yourself'>
      <div>
        <div>
          <h1 className='page-title-text'>Signup</h1>
        </div>
        {/* Signup Page insert Here. */}
        {/* <SignupPage /> */}
        <SignupMaterial />
      </div>
    </Layout>
  );
};

export default Signup;
