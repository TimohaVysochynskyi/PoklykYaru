import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js ';

import {
  getAllProductsController,
  getProductByIdController,
  addProductController,
} from '../controllers/merch.js';

import { addProductSchema } from '../validation/merch.js';

const router = Router();

router.get('/', ctrlWrapper(getAllProductsController));
router.get('/:productId', isValidId, ctrlWrapper(getProductByIdController));

router.post(
  '/',
  validateBody(addProductSchema),
  ctrlWrapper(addProductController),
);
