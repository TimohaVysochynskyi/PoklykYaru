import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { authCustomer } from '../../middlewares/authCustomer.js';

import {
  createPaymentInvoiceController,
  getAllOrdersController,
  getMyOrdersController,
} from '../../controllers/merch/payments.js';

import { createInvoiceSchema } from '../../validation/merch/payments.js';
import { authAdmin } from '../../middlewares/authAdmin.js';

const router = Router();

// customer: list own orders
router.get('/', authCustomer, ctrlWrapper(getMyOrdersController));

// admin-only: list all orders
router.get('/all', authAdmin, ctrlWrapper(getAllOrdersController));

router.post(
  '/invoice',
  authCustomer,
  validateBody(createInvoiceSchema),
  ctrlWrapper(createPaymentInvoiceController),
);

// Webhook is mounted at app level to accept raw body, see server.js

export default router;
