import React, { createContext, useState, useEffect } from 'react';
import { getProducts } from '../helpers/coreApiCalls';
export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const loadAllProduct = () => {
    getProducts()
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          var products = response.data.products;
          // localStorage.setItem('products', JSON.stringify(products));
          setProducts(products);
        }
      })
      .catch((error) => {
        console.log(error);
        // setProducts(JSON.parse(localStorage.getItem('products')));
      });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
