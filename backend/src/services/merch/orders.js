import { OrdersCollection } from '../../models/merch/order.js';

export const getAllOrders = async () => {
  const orders = await OrdersCollection.find();

  return orders;
};

export const getOrderById = async (orderId) => {
  const order = await OrdersCollection.findOne({ _id: orderId });

  return order;
};

export const addOrder = async (payload) => {
  const order = await OrdersCollection.create(payload);

  return order;
};

export const updateOrder = async (orderId, payload, options = {}) => {
  const order = await OrdersCollection.findOneAndUpdate(
    { _id: orderId },
    payload,
    { new: true, includeResultMetadata: false, ...options },
  );

  return order;
};
export const deleteOrder = async (orderId) => {
  const order = await OrdersCollection.findOneAndDelete({ _id: orderId });

  return order;
};
