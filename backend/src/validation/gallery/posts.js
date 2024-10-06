import Joi from 'joi';

export const addPostSchema = Joi.object({
  description: Joi.string().required(),
  images: Joi.array().items(Joi.string()).required(),
});

export const updatePostSchema = Joi.object({
  description: Joi.string(),
  images: Joi.array().items(Joi.string()),
});
