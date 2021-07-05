import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { HelmetProvider } from 'react-helmet-async';
import ProductsContextProvider from './contexts/ProductsContext';
import CartContextProvider from './contexts/CartContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <HelmetProvider>
    <ProductsContextProvider>
      <CartContextProvider>
        <Routes />
      </CartContextProvider>
    </ProductsContextProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
