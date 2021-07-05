/* Cart Page */

import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import {
  CheckoutOrderInfo,
  CheckoutOrderDetails,
  basicAuthUserName,
  basicAuthUserPassword,
} from '../../backend';
import { useHistory } from 'react-router-dom';
import { getItemsFromOrderID } from '../../helpers/orderHelper';
import CartProducts from './CartProducts';
import { CartContext } from '../../contexts/CartContext';
import EmptyCart from '../../assets/emptyCart.png';

// Configuration method for Axios
let config = {
  auth: {
    username: basicAuthUserName,
    password: basicAuthUserPassword,
  },
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
};

const Cart = () => {
  const history = useHistory();
  const { total, cartItems, itemCount, clearCart } = useContext(CartContext);

  // Total Cart Price
  const totalItemPrice = () => {
    let cartProducts = JSON.parse(localStorage.getItem('cart'));
    var totalPrice = 0;
    cartProducts.map((item) => {
      totalPrice = totalPrice + item.prd_Rate;
    });
    return totalPrice;
  };

  // Total Order Data such as total price, total quantity.
  const orderData = {
    customerId: 'CID1',
    totalItem: cartItems.length,
    totalQnty: itemCount,
    totalRate: totalItemPrice(),
    totalPrice: total,
  };

  // Inputting relevant Order Id, items should fetch and redirect to summary page.
  const getRedirectToSummaryPage = (orderNumber) => {
    getItemsFromOrderID(orderNumber).then((data) => {
      history.push({
        pathname: '/orderdetails',
        state: data,
      });
    });
  };

  // Fetch Order Id from by inserting total data to the CheckoutOrderInfo API.
  const insertTotalDataToDatabase = (product) => {
    return axios
      .post(CheckoutOrderInfo, product, config)
      .then((response) => {
        return response.data.orderNo;
      })
      .then((data) => {
        totalItemPrice();
        var arrayOfData = [];

        cartItems.map((product) => {
          arrayOfData.push({
            orderNo: data,
            customerId: 'CD1',
            itemId: product.prd_ID,
            itemQnty: product.quantity,
            itemRate: product.prd_Rate,
            itemPrice: product.prd_Rate * product.quantity,
          });
        });

        arrayOfData.map((product) => {
          axios
            .post(CheckoutOrderDetails, product, config)
            .then((response) => {
              return JSON.parse(response.config.data);
            })
            .then((data) => {
              getRedirectToSummaryPage(data.orderNo);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout title='Cart' description='Ready for checkout.'>
      <div>
        <h1 className='page-title-text'>Cart</h1>
      </div>
      <div>
        {/* If there is no items in the cart it shows Your Cart is empty otherwise show cart Products from CartProducts */}
        {cartItems.length > 0 ? (
          <CartProducts />
        ) : (
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <img src={EmptyCart} alt='empty cart' className='empty-cart-img' />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
