import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';

import {
  loginAdminController,
  refreshAdminController,
  logoutAdminController,
} from '../../controllers/admin_management/auth.js';

import { loginAdminSchema } from '../../validation/admin_management/auth.js';

const router = Router();

router.post(
  '/login',
  validateBody(loginAdminSchema),
  ctrlWrapper(loginAdminController),
);
router.post('/refresh', ctrlWrapper(refreshAdminController));
router.post('/logout', ctrlWrapper(logoutAdminController));

export default router;
