import { EventsCollection } from '../../models/event_management/events.js';
import { deleteMultipleFromCloudinary } from '../../utils/cloudinary.js';

export const getAllEvents = async () => {
  const events = await EventsCollection.find().sort({ order: 1 });

  return events;
};

export const getEventById = async (eventId) => {
  const event = await EventsCollection.findOne({ _id: eventId });

  return event;
};

export const getEventByPath = async (path) => {
  const event = await EventsCollection.findOne({ path });

  return event;
};

export const addEvent = async (payload) => {
  const event = await EventsCollection.create(payload);

  return event;
};

export const updateEvent = async (eventId, payload, options = {}) => {
  const event = await EventsCollection.findByIdAndUpdate(eventId, payload, {
    new: true,
    includeResultMetadata: false,
    ...options,
  });

  return event;
};

export const deleteEvent = async (eventId) => {
  const event = await EventsCollection.findOneAndDelete({ _id: eventId });

  // Delete images from Cloudinary
  if (event) {
    const imagesToDelete = [event.mainImage, ...event.galleryImages];
    await deleteMultipleFromCloudinary(imagesToDelete);
  }

  return event;
};
