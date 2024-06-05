import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import OrderService from "../../service/customer/OrderService";
import OrderCard from "../../components/customer/order/OrderCard";
import ProductService from "../../service/customer/ProductService";

const TrackingOrder = () => {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchOrdersAndProductDetails = async () => {
      try {
        // Fetch orders
        const orders = await OrderService.getOrder();

        // Extract product IDs from order details
        const productIds = orders.flatMap((order) =>
          order.orderDetailsDTOs.map((orderDetail) => orderDetail.productId)
        );
        console.log(productIds);
        // Fetch product details for each productId
        const productPromises = productIds.map((productId) =>
          ProductService.getProductById(productId)
        );
        const products = await Promise.all(productPromises);

        console.log(products);

        // Combine orders with product details and corresponding color info
        const detailedOrders = orders.map((order) => {
          const detailedOrderDetails = order.orderDetailsDTOs.map(
            (orderDetail) => {
              const product = products.find(
                (product) => product.productId === orderDetail.productId
              );
              const color = product.colorDTOs.find(
                (color) => color.colorId === orderDetail.colorId
              );
              return { ...orderDetail, product, color };
            }
          );
          return { ...order, orderDetailsDTOs: detailedOrderDetails };
        });

        setOrders(detailedOrders);
        console.log("Detailed Orders:", detailedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Set loading to false once the orders are fetched
      }
    };

    fetchOrdersAndProductDetails();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ minWidth: 275, mt: 1}}>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <OrderCard key={order.orderId} order={order} index={index} />
        ))
      ) : (
        <Typography variant="h6" component="div">
          No orders found.
        </Typography>
      )}
    </Box>
  );
};

export default TrackingOrder;
