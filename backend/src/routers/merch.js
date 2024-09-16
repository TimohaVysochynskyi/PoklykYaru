import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js ';

import {
  getAllProductsController,
  getProductByIdController,
  addProductController,
  updateProductController,
  deleteProductController,
  getAllOrdersController,
  getOrderByIdController,
  addOrderController,
  updateOrderController,
  deleteOrderController,
  getAllCustomersController,
  getCustomerByIdController,
  deleteCustomerController,
  registerCustomerController,
  loginCustomerController,
  refreshCustomerController,
  logoutCustomerController,
} from '../controllers/merch.js';

import {
  addProductSchema,
  updateProductSchema,
  addOrderSchema,
  updateOrderSchema,
  registerCustomerSchema,
  loginCustomerSchema,
} from '../validation/merch.js';

const router = Router();

// `products` routes

router.get('/products/', ctrlWrapper(getAllProductsController));
router.get('/products/:id', isValidId, ctrlWrapper(getProductByIdController));
router.post(
  '/',
  validateBody(addProductSchema),
  ctrlWrapper(addProductController),
);
router.patch(
  '/products/:id',
  isValidId,
  validateBody(updateProductSchema),
  ctrlWrapper(updateProductController),
);
router.delete('/products/:id', isValidId, ctrlWrapper(deleteProductController));

// `orders` routes

router.get('/orders/', ctrlWrapper(getAllOrdersController));
router.get('/orders/:id', isValidId, ctrlWrapper(getOrderByIdController));
router.post(
  '/orders/',
  validateBody(addOrderSchema),
  ctrlWrapper(addOrderController),
);
router.patch(
  '/orders/:id',
  isValidId,
  validateBody(updateOrderSchema),
  ctrlWrapper(updateOrderController),
);
router.delete('/orders/:id', isValidId, ctrlWrapper(deleteOrderController));

// `customers` routes

router.get('/customers/', ctrlWrapper(getAllCustomersController));
router.get('/customers:/id', isValidId, ctrlWrapper(getCustomerByIdController));
router.delete(
  '/customers/:id',
  isValidId,
  ctrlWrapper(deleteCustomerController),
);

// `customers` routes

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

export default router;
