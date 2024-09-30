import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { authCustomer } from '../../middlewares/authCustomer.js';

import {
  getProfileController,
  updateProfileController,
  deleteProfileController,
} from '../../controllers/merch/profile.js';

import { updateProfileSchema } from '../../validation/merch/profile.js';

const router = Router();

router.use('/', authCustomer);

router.get('/', ctrlWrapper(getProfileController));
router.patch(
  '/',
  validateBody(updateProfileSchema),
  ctrlWrapper(updateProfileController),
);
router.delete('/', ctrlWrapper(deleteProfileController));

export default router;
