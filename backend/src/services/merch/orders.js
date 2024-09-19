import { OrdersCollection } from '../../models/merch/order.js';

export const getAllOrders = async () => {
  const orders = await OrdersCollection.find();

  return orders;
};

export const getOrderById = async () => {
  return 0;
};

export const addOrder = async () => {
  return 0;
};

export const updateOrder = async () => {
  return 0;
};
export const deleteOrder = async () => {
  return 0;
};
