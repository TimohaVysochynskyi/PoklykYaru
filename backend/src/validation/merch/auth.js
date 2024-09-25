import Joi from 'joi';

export const registerCustomerSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string(),
});

export const loginCustomerSchema = Joi.object({
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
});
