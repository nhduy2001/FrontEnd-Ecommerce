import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:8080/api/v1/public/products";
  const [productList, setProductList] = useState([]);

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const fetchProductList = async () => {
    const response = await axios.get(url);
    setProductList(response.data);
  };

  const fetchProductById = async (productId) => {
    try {
      const response = await axios.get(`${url}/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
    }
  };

  const fetchRelatedProducts = async (productName) => {
    try {
      const response = await axios.get(`${url}/by/${productName}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by name:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchProductList();
    }
    loadData();
  }, []);

  const contextValue = {
    productList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    fetchProductById,
    fetchRelatedProducts,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
