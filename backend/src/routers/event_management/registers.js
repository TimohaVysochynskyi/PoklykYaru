import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { authAdmin } from '../../middlewares/authAdmin.js';

import {
  getAllRegistersController,
  getRegisterByIdController,
  addRegisterController,
  deleteRegisterController,
} from '../../controllers/event_management/registers.js';

import { addRegisterSchema } from '../../validation/event_management/registers.js';

const router = Router();

// User
router.post(
  '/',
  validateBody(addRegisterSchema),
  ctrlWrapper(addRegisterController),
);

// Admin
router.get('/', authAdmin, ctrlWrapper(getAllRegistersController));
router.get(
  '/:id',
  isValidId,
  authAdmin,
  ctrlWrapper(getRegisterByIdController),
);

router.delete(
  '/:id',
  isValidId,
  authAdmin,
  ctrlWrapper(deleteRegisterController),
);

export default router;
