import { Router } from 'express';

import productsRouter from './products.js';
import paymentsRouter from './payments.js';
import customersRouter from './customers.js';
import authRouter from './auth.js';
import profileRouter from './profile.js';

const router = Router();

router.use('/products', productsRouter);
router.use('/payments', paymentsRouter);
router.use('/customers', customersRouter);
router.use('/auth', authRouter);
router.use('/profile', profileRouter);

export default router;
