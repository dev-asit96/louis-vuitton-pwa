/* ---------------------------------------------Store Page-------------------------------------------------- */

import React from 'react';
import Layout from '../../components/Layout';
import ProductsGrid from './ProductsGrid';
import '../../styles.css';
import { loadDataFromCookieToSession } from '../../services/cookie.config';

const Store = () => {
  //When user open the tab and login session persist by Loading all the data from cookies to session storage.
  if (document.cookie) {
    loadDataFromCookieToSession();
  }

  return (
    <Layout title='Louis Vuitton' description='This is the Store page'>
      <div>
        <div className='page-title'>
          <h1 className='page-title-text'>Products</h1>
        </div>
        <ProductsGrid />
      </div>
    </Layout>
  );
};

export default Store;
