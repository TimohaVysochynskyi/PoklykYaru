import { EventsCollection } from '../../models/event_management/events.js';

export const getAllEvents = async () => {
  const events = await EventsCollection.find();

  return events;
};

export const getEventById = async () => {
  return 0;
};

export const addEvent = async () => {
  return 0;
};

export const updateEvent = async () => {
  return 0;
};

export const deleteEvent = async () => {
  return 0;
};
