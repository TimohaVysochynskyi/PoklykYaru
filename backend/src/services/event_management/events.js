import { EventsCollection } from '../../models/event_management/events.js';

export const getAllEvents = async () => {
  const events = await EventsCollection.find();

  return events;
};

export const getEventById = async (eventId) => {
  const event = await EventsCollection.findOne({ _id: eventId });

  return event;
};

export const addEvent = async (payload) => {
  const event = await EventsCollection.create(payload);

  return event;
};

export const updateEvent = async (eventId, payload, options = {}) => {
  const event = await EventsCollection.findByIdAndUpdate(
    { _id: eventId },
    payload,
    {
      new: true,
      includeResultMetadata: false,
      ...options,
    },
  );

  return event;
};

export const deleteEvent = async (eventId) => {
  const event = await EventsCollection.findOneAndDelete({ _id: eventId });

  return event;
};
