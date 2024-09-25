import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { authAdmin } from '../../middlewares/authAdmin.js';

import {
  getAllEventsController,
  getEventByIdController,
  addEventController,
  updateEventController,
  deleteEventController,
} from '../../controllers/event_management/events.js';

import {
  addEventSchema,
  updateEventSchema,
} from '../../validation/event_management/events.js';

const router = Router();

// User
router.get('/', ctrlWrapper(getAllEventsController));

// Admin
router.get(
  '/events:/id',
  isValidId,
  authAdmin,
  ctrlWrapper(getEventByIdController),
);
router.post(
  '/',
  validateBody(addEventSchema),
  authAdmin,
  ctrlWrapper(addEventController),
);
router.patch(
  '/:id',
  isValidId,
  authAdmin,
  validateBody(updateEventSchema),
  ctrlWrapper(updateEventController),
);
router.delete('/:id', isValidId, authAdmin, ctrlWrapper(deleteEventController));

export default router;
