import Joi from 'joi';

export const paymentFormSchema = Joi.object({
  orderProducts: Joi.array().required(),
  totalPrice: Joi.number().integer().min(0).required(),
});
