import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';

import {
  registerCustomerController,
  loginCustomerController,
  refreshCustomerController,
  logoutCustomerController,
  requestResetEmailController,
  resetPasswordController,
} from '../../controllers/merch/auth.js';

import {
  registerCustomerSchema,
  loginCustomerSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
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

router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);
router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
