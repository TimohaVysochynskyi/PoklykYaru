import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js ';

import {
  getAllEventsController,
  getEventByIdController,
  addEventController,
  updateEventController,
  deleteEventController,
  getAllRegistersController,
  getRegisterByIdController,
  addRegisterController,
  deleteRegisterController,
} from '../controllers/event_management.js';

import {
  addEventSchema,
  updateEventSchema,
  addRegisterSchema,
} from '../validation/event_management.js';

const router = Router();

// `event` routes

router.get('/events', ctrlWrapper(getAllEventsController));
router.get('/events:/id', isValidId, ctrlWrapper(getEventByIdController));
router.post(
  '/events',
  validateBody(addEventSchema),
  ctrlWrapper(addEventController),
);
router.patch(
  '/events/:id',
  isValidId,
  validateBody(updateEventSchema),
  ctrlWrapper(updateEventController),
);
router.delete('/events:/id', isValidId, ctrlWrapper(deleteEventController));

// `register` routes

router.get('/registers', ctrlWrapper(getAllRegistersController));
router.get('/registers:/id', isValidId, ctrlWrapper(getRegisterByIdController));
router.post(
  '/registers',
  validateBody(addRegisterSchema),
  ctrlWrapper(addRegisterController),
);
router.delete(
  '/registers:/id',
  isValidId,
  ctrlWrapper(deleteRegisterController),
);

export default router;
