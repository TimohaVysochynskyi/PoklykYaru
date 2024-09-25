import createHttpError from 'http-errors';
import {
  getAllEvents,
  getEventById,
  addEvent,
  updateEvent,
  deleteEvent,
} from '../../services/event_management/events.js';

// User
export const getAllEventsController = async (req, res, next) => {
  const events = await getAllEvents();

  res.status(200).send({
    status: 200,
    message: 'Successfully found events',
    data: events,
  });
};

// Admin
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
