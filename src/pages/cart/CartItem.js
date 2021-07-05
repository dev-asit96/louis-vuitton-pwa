import React, { useContext } from "react";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  TrashIcon,
} from "../../components/icons";
import { CartContext } from "../../contexts/CartContext";
import ImageHelper from "../../helpers/ImageHelper";
import { formatNumber } from "../../helpers/utils";

const CartItem = ({ product }) => {
  const { increase, decrease, removeProduct } = useContext(CartContext);

  return (
    <div className="row no-gutters py-2">
      <div className="col-sm-2 p-2">
        {/* cart Item Image */}
        <ImageHelper product={product} />
      </div>
      <div className="col-sm-4 p-2">
        <h5 className="mb-1 mt-3">{product.prd_Name}</h5>
        <p className="mb-1">Price: {formatNumber(product.prd_Rate)} </p>
      </div>
      <div className="col-sm-2 p-2 text-center ">
        <p className="mb-0 mt-3">Qty: {product.quantity}</p>
      </div>

      <div className="col-sm-4 p-2 text-right">
        <button
          onClick={() => increase(product)}
          className="btn btn-primary btn-sm mr-2 mb-1 mt-3"
        >
          <PlusCircleIcon width={"20px"} />
        </button>

        {/* If the particular item quantity is 1 it shows Minus Button(-) */}
        {product.quantity > 1 && (
          <button
            onClick={() => decrease(product)}
            className="btn btn-danger btn-sm mb-1 mt-3"
          >
            <MinusCircleIcon width={"20px"} />
          </button>
        )}

        {/* If the particular item quantity is greater than 1 it shows Trash Button. */}
        {product.quantity === 1 && (
          <button
            onClick={() => removeProduct(product)}
            className="btn btn-danger btn-sm mb-1 mt-3"
          >
            <TrashIcon width={"20px"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
