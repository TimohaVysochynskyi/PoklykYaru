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

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});
