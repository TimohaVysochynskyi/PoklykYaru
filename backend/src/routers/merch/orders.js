import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { authCustomer } from '../../middlewares/authCustomer.js';
import { authAdmin } from '../../middlewares/authAdmin.js';

import {
  getAllOrdersController,
  getOrderByIdController,
  addOrderController,
  updateOrderController,
  deleteOrderController,
} from '../../controllers/merch/orders.js';

import {
  addOrderSchema,
  updateOrderSchema,
} from '../../validation/merch/orders.js';

const router = Router();

// User
router.post(
  '/',
  authCustomer,
  validateBody(addOrderSchema),
  ctrlWrapper(addOrderController),
);

// Admin
router.get('/', authAdmin, ctrlWrapper(getAllOrdersController));
router.get('/:id', isValidId, authAdmin, ctrlWrapper(getOrderByIdController));
router.patch(
  '/:id',
  isValidId,
  authAdmin,
  validateBody(updateOrderSchema),
  ctrlWrapper(updateOrderController),
);
router.delete('/:id', isValidId, authAdmin, ctrlWrapper(deleteOrderController));
export default router;
