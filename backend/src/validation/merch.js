import Joi from 'joi';

export const addProductSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().required(),
  price: Joi.number().integer().min(0).required(),
  category: Joi.string().required(),
  images: Joi.array().items(Joi.string()).required(),
  variations: Joi.object().required(),
  stock: Joi.number().required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  description: Joi.string(),
  price: Joi.number().integer().min(0),
  category: Joi.string(),
  images: Joi.array().items(Joi.string()),
  variations: Joi.object(),
  stock: Joi.number(),
});

export const addOrderSchema = Joi.object({
  customer: Joi.string().required(),
  orderProducts: Joi.array().required(),
  shippingAddress: Joi.object().required(),
  totalPrice: Joi.number().integer().min(0).required(),
});

export const updateOrderSchema = Joi.object({
  paymentStatus: Joi.string(),
  orderStatus: Joi.string(),
  isPaid: Joi.boolean(),
});

export const registerCustomerSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string(),
});

export const loginCustomerSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
});
