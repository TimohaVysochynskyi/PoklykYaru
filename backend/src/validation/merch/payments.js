import Joi from 'joi';

const variationSchema = Joi.object({
  size: Joi.array().items(Joi.string()).required(),
  color: Joi.array().items(Joi.string()).required(),
});

const orderItemSchema = Joi.object({
  product: Joi.string().required(),
  variation: variationSchema.required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().min(0).required(),
}).unknown(true);

export const createInvoiceSchema = Joi.object({
  orderProducts: Joi.array().items(orderItemSchema).min(1).required(),
  totalPrice: Joi.number().min(0).required(),
});
