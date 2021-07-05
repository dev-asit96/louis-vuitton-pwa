import React from 'react';
import Layout from '../../components/Layout';
import OrderSummary from '../order/OrderSummary';

const Store = () => {
  return (
    <Layout title='Order' description='This is the Order page'>
      <div>
        <div className='text-center'>
          <h1>Orders</h1>
          
        </div>
        <OrderSummary />
      </div>
    </Layout>
  );
};

export default Store;
