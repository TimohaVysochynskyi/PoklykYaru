import Joi from 'joi';

export const addItemSchema = Joi.object({
  variation: Joi.object().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
});
