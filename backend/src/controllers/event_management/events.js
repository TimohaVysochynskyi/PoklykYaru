import createHttpError from 'http-errors';
import {
  getAllEvents,
  getEventById,
  getEventByPath,
  addEvent,
  updateEvent,
  deleteEvent,
} from '../../services/event_management/events.js';
import {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  deleteMultipleFromCloudinary,
} from '../../utils/cloudinary.js';
import fs from 'node:fs/promises';

// User & Admin
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

export const getEventByPathController = async (req, res, next) => {
  const { path } = req.params;
  const event = await getEventByPath(path);

  if (!event) {
    return next(createHttpError(404, 'Event not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found event with path ${path}`,
    data: event,
  });
};

// Admin
export const addEventController = async (req, res, next) => {
  const { mainImage, galleryImages } = req.files || {};

  if (!mainImage || !mainImage[0]) {
    return next(createHttpError(400, 'Main image is required'));
  }

  if (!galleryImages || galleryImages.length !== 6) {
    return next(createHttpError(400, 'Exactly 6 gallery images are required'));
  }

  const payload = {
    title: req.body.title,
    path: req.body.path,
    description: req.body.description,
    buttonText: req.body.buttonText || '',
    buttonLink: req.body.buttonLink || '',
    order: Number(req.body.order) || 0,
  };

  // Upload main image to Cloudinary
  const mainImageUrl = await uploadToCloudinary(
    mainImage[0].path,
    'PoklykYaru/events',
  );

  // Upload gallery images to Cloudinary
  const galleryImageUrls = await uploadMultipleToCloudinary(
    galleryImages,
    'PoklykYaru/events/gallery',
  );

  // Clean up temporary files
  await fs
    .unlink(mainImage[0].path)
    .catch((err) => console.error('Error deleting temp file:', err));
  await Promise.all(
    galleryImages.map((file) =>
      fs
        .unlink(file.path)
        .catch((err) => console.error('Error deleting temp file:', err)),
    ),
  );

  const event = await addEvent({
    ...payload,
    mainImage: mainImageUrl,
    galleryImages: galleryImageUrls,
  });

  res.status(201).send({
    status: 200,
    message: 'Successfully created an event',
    data: event,
  });
};

export const updateEventController = async (req, res, next) => {
  const { id } = req.params;
  const { mainImage, galleryImages } = req.files || {};

  const existingEvent = await getEventById(id);
  if (!existingEvent) {
    return next(createHttpError(404, 'Event not found'));
  }

  const payload = {
    title: req.body.title,
    path: req.body.path,
    description: req.body.description,
    buttonText: req.body.buttonText || '',
    buttonLink: req.body.buttonLink || '',
    order: Number(req.body.order),
  };

  // Handle main image replacement
  if (mainImage && mainImage[0]) {
    // Delete old main image
    await deleteMultipleFromCloudinary([existingEvent.mainImage]);

    // Upload new main image
    payload.mainImage = await uploadToCloudinary(
      mainImage[0].path,
      'PoklykYaru/events',
    );

    // Clean up temp file
    await fs
      .unlink(mainImage[0].path)
      .catch((err) => console.error('Error deleting temp file:', err));
  }

  // Handle gallery images replacement
  if (galleryImages && galleryImages.length === 6) {
    // Delete old gallery images
    await deleteMultipleFromCloudinary(existingEvent.galleryImages);

    // Upload new gallery images
    payload.galleryImages = await uploadMultipleToCloudinary(
      galleryImages,
      'PoklykYaru/events/gallery',
    );

    // Clean up temp files
    await Promise.all(
      galleryImages.map((file) =>
        fs
          .unlink(file.path)
          .catch((err) => console.error('Error deleting temp file:', err)),
      ),
    );
  }

  const event = await updateEvent(id, payload);

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
