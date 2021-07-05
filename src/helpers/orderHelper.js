//post all the totals details into the database.
import axios from "axios";
import {
  basicAuthUserName,
  basicAuthUserPassword,
  GetOrderView,
  GetOrderViewDetails,
} from "../backend";

let config = {
 
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
};

//Retrieve all the order information from the customer ID.
export const getOrdersFromCustomerId = () => {
  return axios
    .post(GetOrderView, JSON.stringify({ customerId: "CID1" }), config)
    .then((response) => {
      return response.data.orderInfo;
    })
    .catch((error) => {
      console.log(error);
    });
};

//Retrieve all the Item information from the Order ID.
export const getItemsFromOrderID = (orderData) => {
  let orderNumber = JSON.stringify({
    orderNo: orderData,
  });

  return axios
    .post(GetOrderViewDetails, orderNumber, config)
    .then((response) => {
      return response.data.orderDetails;
    })
    .catch((error) => {
      console.log(error);
    });
};
