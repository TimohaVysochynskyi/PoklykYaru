import Joi from 'joi';

export const addEventSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.array().required(),
});

export const updateEventSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  image: Joi.array(),
});
