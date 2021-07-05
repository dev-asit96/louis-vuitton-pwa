/* --------------------------------------------Checkout Page------------------------------------------------- */

import React, { useState, useEffect } from 'react';
import './Order.module.scss';
import { useLocation } from 'react-router-dom';
import OrderImageHelper from '../../helpers/OrderImageHelper';
import Layout from '../../components/Layout';
import { formatNumber } from '../../helpers/utils';

const OrderDetails = ({ props }) => {
  const [order, setOrder] = useState([]);
  let location = useLocation(props);
  const arrayData = location.state;

  useEffect(() => {
    setOrder(arrayData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title='Order'>
      <div className='text-center mt-5'>
        <h1>Cart Items</h1>
        <p>Cart Items of respective order</p>
      </div>
      <div className='card card-body border-0'>
        {order.map((order, index) => (
          <div key={index} className='row no-gutters py-2'>
            <div className='col-sm-2 py-2'>
              <OrderImageHelper sl_no={order.prdimg} />
            </div>
            <div className='col-sm-4 p-2'>
              <h5 className='mb-1 mt-3'>{order.prdname}</h5>
              <p className='mb-1'>Item Price: {formatNumber(order.rate)}</p>
            </div>
            <div className='col-sm-2 p-2 text-center'>
              <p className='mb-0 mt-3'>Qty: {order.qty}</p>
              <p className='mb-1'>Total Price: {formatNumber(order.price)}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default OrderDetails;
