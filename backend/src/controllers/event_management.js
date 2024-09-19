import createHttpError from 'http-errors';
import {
  getAllEvents,
  getEventById,
  addEvent,
  updateEvent,
  deleteEvent,
} from '../services/event_management/events.js';
import {
  getAllRegisters,
  getRegisterById,
  addRegister,
  deleteRegister,
} from '../services/event_management/registers.js';

// `events` controllers

export const getAllEventsController = async (req, res, next) => {
  const events = await getAllEvents();

  res.status(200).send({
    status: 200,
    message: 'Successfully found events',
    data: events,
  });
};

export const getEventByIdController = async (req, res, next) => {
  const { id } = req.params;
  const event = await getEventById(id);

  if (!event) {
    return next(createHttpError(404, 'Event not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found event with id ${id}`,
    data: event,
  });
};

export const addEventController = async (req, res, next) => {
  const event = await addEvent(req.body);

  res.status(201).send({
    status: 200,
    message: 'Successfully created an event',
    data: event,
  });
};

export const updateEventController = async (req, res, next) => {
  const { id } = req.params;
  const event = await updateEvent(id, req.body);

  if (!event) {
    return next(createHttpError(404, 'Event not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully updated an event with id ${id}`,
    data: event,
  });
};

export const deleteEventController = async (req, res, next) => {
  const { id } = req.params;
  const event = await deleteEvent(id);

  if (!event) {
    return next(createHttpError(404, 'Event not found'));
  }

  res.status(204).send();
};

// `registers` controllers

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
