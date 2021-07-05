/* ---------------------------------------------------Product Items Page------------------------------------------------ */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { formatNumber } from "../../helpers/utils";
import ImageHelper from "../../helpers/ImageHelper";

const ProductItem = ({ product }) => {
  const { addProduct, cartItems, increase } = useContext(CartContext);
  const isInCart = (product) => {
    return !!cartItems.find((item) => item.sl_no === product.sl_no);
  };

  return (
    <div className="card card-body ">
      <ImageHelper product={product} />
      <p>{product.name}</p>
      <h3 className="text-left">{formatNumber(product.prd_Rate)}</h3>
      <div className="text-right">
        
        <Link to="/" className="btn btn-link btn-sm mr-2">
          Details
        </Link>

        {/*Add More Button*/}
        {isInCart(product) && (
          <button
            onClick={() => increase(product)}
            className="btn btn-outline-primary btn-sm"
          >
            Add more
          </button>
        )}

        {/*Add to Cart Button*/}
        {!isInCart(product) && (
          <button
            onClick={() => addProduct(product)}
            className="btn btn-primary btn-sm"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
