import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { authAdmin } from '../../middlewares/authAdmin.js';

import {
  getAllCustomersController,
  getCustomerByIdController,
} from '../../controllers/merch/customers.js';

const router = Router();

// Admin
router.get('/', authAdmin, ctrlWrapper(getAllCustomersController));
router.get(
  '/:id',
  isValidId,
  authAdmin,
  ctrlWrapper(getCustomerByIdController),
);

export default router;
