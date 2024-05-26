import React, { useContext } from "react";
import "./DisplayProduct.css";
import { StoreContext } from "../../context/StoreContext";
import ProductItem from "../productItem/ProductItem";

export const DisplayProduct = () => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="display-product" id="display-product">
      <div className="display-product-list">
        {food_list.map((item, index) => {
          return (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};
