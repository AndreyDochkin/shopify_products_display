import "./Card.css";
import React from "react";
import Canvas from "../Canvas/Canvas";
import { findProductName } from "../../utils/utils";

const Card = ({ product }) => {
  const productName = findProductName(product.bodyHtml);

  return (
    <div className="product-card">
      {/* <img className="product-image" src={product.imageUrl} alt="" /> */}
      <Canvas src={product.imageUrl} className="product-image" alt="" />
      <div className="product-info">
        <p dangerouslySetInnerHTML={{ __html: productName }}></p>
      </div>
    </div>
  );
};

export default Card;
