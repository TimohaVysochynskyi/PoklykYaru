import createHttpError from 'http-errors';

import {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
} from '../../services/merch/orders.js';

// User
export const addOrderController = async (req, res, next) => {
  const order = await addOrder(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfully created an order',
    data: order,
  });
};

// Admin
export const getAllOrdersController = async (req, res, next) => {
  const orders = await getAllOrders();

  res
    .status(200)
    .send({ status: 200, message: 'Successfully found orders', data: orders });
};

export const getOrderByIdController = async (req, res, next) => {
  const { id } = req.params;
  const order = await getOrderById(id);

  if (!order) {
    return next(createHttpError(404, 'Order not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found order with id ${id}`,
    data: order,
  });
};

export const updateOrderController = async (req, res, next) => {
  const { id } = req.params;
  const order = await updateOrder(id, req.body);

  if (!order) {
    return next(createHttpError(404, 'Order not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully updated an order with id ${id}`,
    data: order,
  });
};

export const deleteOrderController = async (req, res, next) => {
  const { id } = req.params;
  const order = await deleteOrder(id);

  if (!order) {
    return next(createHttpError(404, 'Order not found'));
  }

  res.status(204).send();
};
