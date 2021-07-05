/* --------------------------------------------Order Page----------------------------------------------- */

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Order.module.scss";
import {
  getItemsFromOrderID,
  getOrdersFromCustomerId,
} from "../../helpers/orderHelper";

const OrderSummary = () => {
  let history = useHistory();
  const [order, setOrder] = useState([]);

  const loadAllOrderDetails = () => {
    getOrdersFromCustomerId().then((data) => {
      setOrder(data);
    });
  };

  useEffect(() => {
    loadAllOrderDetails();
  }, []);

  /* When user click order details button it takes respective order ID and return order details */
  const handleOnClick = (event) => {
    var rowId = event.target.parentNode.parentNode.id;
    var data = document.getElementById(rowId).querySelector(".order-data");
    var orderNumber = data.innerHTML;

    /* Items fetch from order ID. */
    getItemsFromOrderID(orderNumber).then((data) => {
      history.push({
        pathname: "/orderdetails",
        state: data,
      });
    });
  };

  return (
    <div>
      <div className="container">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Order Number</th>
              <th scope="col">Order Date</th>
              <th scope="col">Order item</th>
              <th scope="col">Order Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {/* Map orders */}
            {order.map((item, index) => (
              <tr key={index} id={index}>
                <th className="order-data" scope="row">
                  {item.ordno}
                </th>
                <td>{item.orddt}</td>
                <td>{item.orditm}</td>
                <td>{item.ordvl}</td>
                <td>
                  <button
                    type="button"
                    className="btn-outline-info"
                    onClick={(event) => {
                      handleOnClick(event);
                    }}
                  >
                    Order Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderSummary;
