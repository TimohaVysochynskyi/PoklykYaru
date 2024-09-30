import Joi from 'joi';

export const paymentFormSchema = Joi.object({
  orderProducts: Joi.array().required(),
  shippingAddress: Joi.object().required(),
  totalPrice: Joi.number().integer().min(0).required(),
});
