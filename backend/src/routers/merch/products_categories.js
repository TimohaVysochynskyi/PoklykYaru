import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { authAdmin } from '../../middlewares/authAdmin.js';

import {
  addCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
} from '../../controllers/merch/products.js';

import {
  addCategorySchema,
  updateCategorySchema,
} from '../../validation/merch/products.js';

const router = Router();

router.get('/', ctrlWrapper(getAllCategoriesController));

router.post(
  '/',
  authAdmin,
  validateBody(addCategorySchema),
  ctrlWrapper(addCategoryController),
);

router.put(
  '/:id',
  isValidId,
  authAdmin,
  validateBody(updateCategorySchema),
  ctrlWrapper(updateCategoryController),
);

router.delete(
  '/:id',
  isValidId,
  authAdmin,
  ctrlWrapper(deleteCategoryController),
);

export default router;
