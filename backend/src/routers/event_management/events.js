import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { authAdmin } from '../../middlewares/authAdmin.js';
import { upload } from '../../middlewares/multer.js';

import {
  getAllEventsController,
  getEventByIdController,
  getEventByPathController,
  addEventController,
  updateEventController,
  deleteEventController,
} from '../../controllers/event_management/events.js';

import {
  addEventSchema,
  updateEventSchema,
} from '../../validation/event_management/events.js';

const router = Router();

// User & Admin - Get all events
router.get('/', ctrlWrapper(getAllEventsController));

// User & Admin - Get event by ID
router.get('/:id', isValidId, ctrlWrapper(getEventByIdController));

// User & Admin - Get event by path
router.get('/by-path/:path', ctrlWrapper(getEventByPathController));

// Admin - Create event
router.post(
  '/',
  authAdmin,
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 6 },
  ]),
  validateBody(addEventSchema),
  ctrlWrapper(addEventController),
);

// Admin - Update event
router.put(
  '/:id',
  isValidId,
  authAdmin,
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 6 },
  ]),
  validateBody(updateEventSchema),
  ctrlWrapper(updateEventController),
);

// Admin - Delete event
router.delete('/:id', isValidId, authAdmin, ctrlWrapper(deleteEventController));

export default router;
