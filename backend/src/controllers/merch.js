import createHttpError from 'http-errors';
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
  getAllCustomers,
  getCustomerById,
  deleteCustomer,
  registerCustomer,
  loginCustomer,
  refreshCustomer,
  logoutCustomer,
} from '../services/merch.js';

import { THIRTY_DAYS } from '../constants/index.js';

// `products` controllers

export const getAllProductsController = async (req, res, next) => {
  const products = await getAllProducts();

  res.status(200).send({
    status: 200,
    message: 'Successfully found products',
    data: products,
  });
};

export const getProductByIdController = async (req, res, next) => {
  const { id } = req.params;
  const product = await getProductById(id);

  if (!product) {
    return next(createHttpError(404, 'Product not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found product with id ${id}`,
    data: product,
  });
};

export const addProductController = async (req, res, next) => {
  const product = await addProduct(req.body);

  res.status(201).send({
    status: 200,
    message: 'Successfully created a product',
    data: product,
  });
};

export const updateProductController = async (req, res, next) => {
  const { id } = req.params;
  const product = await updateProduct(id, req.body);

  if (!product) {
    return next(createHttpError(404, 'Product not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully updated a product with id ${id}`,
    data: product,
  });
};

export const deleteProductController = async (req, res, next) => {
  const { id } = req.params;
  const product = await deleteProduct(id);

  if (!product) {
    return next(createHttpError(404, 'Product not found'));
  }

  res.status(204).send();
};

// `orders` controller

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

export const addOrderController = async (req, res, next) => {
  const order = await addOrder(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfully created an order',
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

export const getAllCustomersController = async (req, res, next) => {
  const customers = await getAllCustomers();

  res.status(200).send({
    status: 200,
    message: 'Successfully found customers',
    data: customers,
  });
};

export const getCustomerByIdController = async (req, res, next) => {
  const { id } = req.params;
  const customer = await getCustomerById(id);

  if (!customer) {
    return next(createHttpError(404, 'Customer not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found customer with id ${id}`,
    data: customer,
  });
};

export const deleteCustomerController = async (req, res, next) => {
  const { id } = req.params;
  const customer = await deleteCustomer(id);

  if (!customer) {
    return next(createHttpError(404, 'Customer not found'));
  }

  res.status(204).send();
};

export const registerCustomerController = async (req, res, next) => {
  const customer = await registerCustomer(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfully registered a customer',
    data: customer,
  });
};

export const loginCustomerController = async (req, res, next) => {
  const session = await loginCustomer(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(200).send({
    status: 200,
    message: 'Successfully logged in a customer',
    data: { accessToken: session.accessToken },
  });
};

export const refreshCustomerController = async (req, res, next) => {
  const session = await refreshCustomer({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(200).send({
    status: 200,
    message: 'Successfully refreshed a session',
    data: { accessToken: session.accessToken },
  });
};

export const logoutCustomerController = async (req, res, next) => {
  if (req.cookies.sessionId) {
    await logoutCustomer(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
