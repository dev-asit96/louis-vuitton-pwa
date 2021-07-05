/* Layout Page */

import React from 'react';
import Header from './shared/header';
import Footer from './shared/footer';
import { Helmet } from 'react-helmet-async';
// import 'bootswatch/dist/lux/bootstrap.css';
import '../styles.css';

const Layout = ({ title, description, children }, props) => {
  return (
    <div className='backgroundColor'>
      <Helmet>
        <title>{title ? title : 'Sample Cart Page'}</title>
        <meta
          name='description'
          content={description || 'React.js Boilerplate'}
        />
      </Helmet>
      <Header />
      <div className='container'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
