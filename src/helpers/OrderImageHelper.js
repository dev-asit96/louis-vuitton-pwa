import React from "react";
import { ImageAPI } from "../backend";

const OrderImageHelper = ({ sl_no }) => {
  const imageURL = `${ImageAPI}/${sl_no}`;
  return (
    <div className="rounded">
      <img
        src={imageURL}
        alt="product"
        style={{
          display: "block",
          margin: "15px auto 10px",
          maxHeight: "180px",
        }}
        className="img-fluid "
      />
    </div>
  );
};

export default OrderImageHelper;
