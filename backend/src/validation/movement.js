import Joi from 'joi';

export const addMemberSchema = Joi.object({
  fullName: Joi.string().min(3).max(60).required(),
  psevdo: Joi.string().min(2).max(30).required(),
  phoneNumber: Joi.string().required(),
  adress: Joi.string().required(),
  level: Joi.string().required(),
});

export const updateMemberSchema = Joi.object({
  fullName: Joi.string().min(3).max(60),
  psevdo: Joi.string().min(2).max(30),
  phoneNumber: Joi.string(),
  adress: Joi.string(),
  level: Joi.string(),
  completedDisciplines: Joi.array(),
});
