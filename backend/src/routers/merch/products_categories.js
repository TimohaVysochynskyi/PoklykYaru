import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { authAdmin } from '../../middlewares/authAdmin.js';

import {
  addCategoryController,
  getAllCategoriesController,
} from '../../controllers/merch/products.js';

import { addCategorySchema } from '../../validation/merch/products.js';

const router = Router();

router.get('/', ctrlWrapper(getAllCategoriesController));

router.post(
  '/',
  authAdmin,
  validateBody(addCategorySchema),
  ctrlWrapper(addCategoryController),
);

export default router;
