import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { authCustomer } from '../../middlewares/authCustomer.js';
// import { authAdmin } from '../../middlewares/authAdmin.js';

import {
  getAllPaymentsController,
  getPaymentsByIdController,
  paymentFormController,
} from '../../controllers/merch/payments.js';

import { paymentFormSchema } from '../../validation/merch/payments.js';

const router = Router();

router.get('/', ctrlWrapper(getAllPaymentsController));
router.get('/:id', isValidId, ctrlWrapper(getPaymentsByIdController));

router.post(
  '/form',
  authCustomer,
  validateBody(paymentFormSchema),
  ctrlWrapper(paymentFormController),
);

export default router;
