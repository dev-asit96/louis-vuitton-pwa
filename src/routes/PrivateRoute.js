import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../services/storage.service";

const PrivateRoute = ({ component: Component, ...rest }) => (
  /* Show the component, when the user is logged in 
     Otherwise, redirect the user to Signup Page.   */

  <Route
    {...rest}
    render={(props) =>
      isLogin() ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default PrivateRoute;
