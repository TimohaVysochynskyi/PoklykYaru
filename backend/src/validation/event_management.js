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

export const addRegisterSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  psevdo: Joi.string().min(2).max(30),
  workPlace: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  telegramContact: Joi.string().required(),
  socialMedia: Joi.string().required(),
});
