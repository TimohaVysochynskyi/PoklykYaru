import { Router } from 'express';

import productsRouter from './products.js';
import ordersRouter from './orders.js';
import customersRouter from './customers.js';
import authRouter from './auth.js';

const router = Router();

router.use('/products', productsRouter);
router.use('/orders', ordersRouter);
router.use('/customers', customersRouter);
router.use('/auth', authRouter);

export default router;
