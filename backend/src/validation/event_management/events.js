import Joi from 'joi';

export const addEventSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  path: Joi.string()
    .pattern(/^[a-z0-9-]+$/)
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.pattern.base':
        'Path must contain only lowercase letters, numbers and hyphens',
    }),
  description: Joi.string().min(10).max(2000).required(),
  buttonText: Joi.string().max(100).optional().allow(''),
  buttonLink: Joi.string().uri().optional().allow(''),
  order: Joi.number().integer().min(0).default(0),
});

export const updateEventSchema = Joi.object({
  title: Joi.string().min(3).max(200),
  path: Joi.string()
    .pattern(/^[a-z0-9-]+$/)
    .min(2)
    .max(100)
    .messages({
      'string.pattern.base':
        'Path must contain only lowercase letters, numbers and hyphens',
    }),
  description: Joi.string().min(10).max(2000),
  buttonText: Joi.string().max(100).allow(''),
  buttonLink: Joi.string().uri().allow(''),
  order: Joi.number().integer().min(0),
});
