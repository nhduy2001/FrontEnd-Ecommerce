import React, { useContext } from "react";
import "./DisplayProduct.css";
import { StoreContext } from "../../context/StoreContext";
import ProductItem from "../productItem/ProductItem";

export const DisplayProduct = () => {
  const { productList } = useContext(StoreContext);

  function formatPrice(n) {
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  return (
    <div className="display-product" id="display-product">
      <div className="display-product-list">
        {productList.map((item, index) => {
          return (
            <ProductItem
              key={index}
              productId={item.productId}
              name={item.name}
              description={item.description}
              price={formatPrice(item.price)}
              colorDTOs={item.colorDTOs}
            />
          );
        })}
      </div>
    </div>
  );
};
