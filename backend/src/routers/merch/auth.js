import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';

import {
  registerCustomerController,
  loginCustomerController,
  refreshCustomerController,
  logoutCustomerController,
} from '../../controllers/merch/auth.js';

import {
  registerCustomerSchema,
  loginCustomerSchema,
} from '../../validation/merch/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerCustomerSchema),
  ctrlWrapper(registerCustomerController),
);
router.post(
  '/login',
  validateBody(loginCustomerSchema),
  ctrlWrapper(loginCustomerController),
);
router.post('/refresh', ctrlWrapper(refreshCustomerController));
router.post('/logout', ctrlWrapper(logoutCustomerController));

export default router;
