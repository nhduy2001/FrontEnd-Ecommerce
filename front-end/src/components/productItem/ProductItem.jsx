import React, { useContext } from "react";
import "./ProductItem.css";
import { assets } from "../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const ProductItem = ({ productId, name, price, colorDTOs }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const image = colorDTOs.length > 0 ? colorDTOs[0].colorImage : " ";
  const imagePath = "/products/";

  return (
    <Link to={`/product/${productId}`} className="product-item-link">
      <div className="product-item">
        <div className="product-item-img-container">
          <img className="product-item-image" src={imagePath + image} alt="" />
          {!cartItems[productId] ? (
            <img
              className="add"
              onClick={() => addToCart(productId)}
              src={assets.add_icon_white}
              alt=""
            />
          ) : (
            <div className="product-item-counter">
              <img
                onClick={() => removeFromCart(productId)}
                src={assets.remove_icon_red}
                alt=""
              />
              <p>{cartItems[productId]}</p>
              <img
                onClick={() => addToCart(productId)}
                src={assets.add_icon_green}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="product-item-info">
          <div className="product-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
          </div>
          <p className="product-item-price">{price}đ</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
