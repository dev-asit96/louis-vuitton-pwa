// Router Page.
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

/* Router Pages */
import Order from '../pages/order';
import Store from '../pages/store';
import Cart from '../pages/cart';
import Login from '../pages/authentication/login';
import Signup from '../pages/authentication/signup';
import OrderDetails from '../pages/order/OrderDetails';

/* Private and Public Routes */
import PublicRoute from '../routes/PublicRoute';
import PrivateRoute from '../routes/PrivateRoute';

const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* Public Routes */}
        <PublicRoute
          path='/signup'
          component={Signup}
          exact
          restricted={true}
        />
        <PublicRoute restricted={true} path='/login' component={Login} exact />
        <PublicRoute exact path='/cart' component={Cart} />
        <PublicRoute exact path='/' component={Store} />
        {/* Private Routes */}
        <PrivateRoute exact path='/order' component={Order} />
        <PrivateRoute exact path='/orderdetails' component={OrderDetails} />
      </Switch>
    </Router>
  );
};

export default Routes;
