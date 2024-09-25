import Joi from 'joi';

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
