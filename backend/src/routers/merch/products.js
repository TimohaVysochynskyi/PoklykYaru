import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { authCustomer } from '../../middlewares/authCustomer.js';
import { authAdmin } from '../../middlewares/authAdmin.js';
import { upload } from '../../middlewares/multer.js';

import {
  getAllProductsController,
  getProductByIdController,
  addProductController,
  updateProductController,
  deleteProductController,
} from '../../controllers/merch/products.js';

import {
  addProductSchema,
  updateProductSchema,
} from '../../validation/merch/products.js';

const router = Router();

// User
router.get('/', ctrlWrapper(getAllProductsController));
router.get(
  '/:id',
  isValidId,
  authCustomer,
  ctrlWrapper(getProductByIdController),
);

// Admin
router.post(
  '/',
  authAdmin,
  upload.array('images', 10),
  validateBody(addProductSchema),
  ctrlWrapper(addProductController),
);
router.patch(
  '/:id',
  isValidId,
  authAdmin,
  validateBody(updateProductSchema),
  ctrlWrapper(updateProductController),
);
router.delete(
  '/:id',
  isValidId,
  authAdmin,
  ctrlWrapper(deleteProductController),
);

export default router;
