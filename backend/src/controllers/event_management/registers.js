import createHttpError from 'http-errors';
import {
  getAllRegisters,
  getRegisterById,
  addRegister,
  deleteRegister,
} from '../../services/event_management/registers.js';

export const getAllRegistersController = async (req, res, next) => {
  const registers = await getAllRegisters();

  res.status(200).send({
    status: 200,
    message: 'Successfully found registers',
    data: registers,
  });
};

export const getRegisterByIdController = async (req, res, next) => {
  const { id } = req.params;
  const register = await getRegisterById(id);

  if (!register) {
    return next(createHttpError(404, 'Register not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found register with id ${id}`,
    data: register,
  });
};

export const addRegisterController = async (req, res, next) => {
  const register = await addRegister(req.body);

  res.status(201).send({
    status: 200,
    message: 'Successfully created a register',
    data: register,
  });
};

export const deleteRegisterController = async (req, res, next) => {
  const { id } = req.params;
  const register = await deleteRegister(id);

  if (!register) {
    return next(createHttpError(404, 'Register not found'));
  }

  res.status(204).send();
};
