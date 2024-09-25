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
