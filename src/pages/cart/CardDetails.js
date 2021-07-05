import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CartContext } from '../../contexts/CartContext';
import { useHistory } from 'react-router-dom';
import { formatNumber } from '../../helpers/utils';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {
  CheckoutOrderInfo,
  CheckoutOrderDetails,
  basicAuthUserName,
  basicAuthUserPassword,
} from '../../backend';
import { getItemsFromOrderID } from '../../helpers/orderHelper';

const cookies = new Cookies();
// Configuration method for Axios
let config = {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
};
const useStyles = makeStyles({
  root: {
    minWidth: 100,
    maxWidth: 300,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 21,
    fontWeight: 600,
    fontFamily: 'Nunito Sans',
  },
  pos: {
    fontSize: 21,
    fontWeight: 600,
    fontFamily: 'Nunito Sans',
    marginBottom: 12,
  },
  typo: {
    fontSize: 21,
    fontWeight: 600,
    fontFamily: 'Nunito Sans',
  },
});

export default function SimpleCard() {
  const classes = useStyles();
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
  // Fetch Order Id from by inserting total data to the CheckoutOrderInfo API.
  const insertTotalDataToDatabase = (product) => {
    cookies.set('Name', 'Asit Debata', {
      sameSite: 'strict',
      path: '/',
      expires: new Date(new Date().getTime() + 5 * 1000),
      httpOnly: true,
    });
    console.log(cookies.get('myCat')); // Pacman
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
              // getRedirectToSummaryPage(data.orderNo);
              console.log(data.orderNo);
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
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          Cart Details
        </Typography>
        <Typography
          variant='h5'
          component='h5'
          color='textSecondary'
          className={classes.typo}
        >
          Total Item
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {itemCount}
        </Typography>
        <Typography
          variant='h5'
          component='h5'
          color='textSecondary'
          className={classes.typo}
        >
          Total Price
        </Typography>
        <Typography color='textSecondary' className={classes.pos}>
          {formatNumber(total)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          onClick={() => {
            insertTotalDataToDatabase(orderData);
            clearCart();
          }}
        >
          Checkout
        </Button>
        <Button size='small' onClick={clearCart}>
          Clear
        </Button>
      </CardActions>
    </Card>
  );
}
