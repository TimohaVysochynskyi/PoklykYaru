import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  firstName: Joi.string().min(2).max(30),
  lastName: Joi.string().min(3).max(30),
  phoneNumber: Joi.string(),
  email: Joi.string(),
});
