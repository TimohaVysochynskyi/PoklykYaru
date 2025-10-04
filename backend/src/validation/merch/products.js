import Joi from 'joi';

export const addProductSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().required(),
  price: Joi.number().integer().min(0).required(),
  composition: Joi.string().required(),
  category: Joi.string().required(),
  variations: Joi.object().required(),
  stock: Joi.number().required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  description: Joi.string(),
  price: Joi.number().integer().min(0),
  composition: Joi.string(),
  category: Joi.string(),
  images: Joi.array(),
  variations: Joi.object(),
  stock: Joi.number(),
});

export const addCategorySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});
