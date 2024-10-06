import Joi from 'joi';

export const loginAdminSchema = Joi.object({
  psevdo: Joi.string().required(),
  password: Joi.string().required(),
});
