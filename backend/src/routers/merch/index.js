import { Router } from 'express';

import productsRouter from './products.js';
import paymentsRouter from './payments.js';
import customersRouter from './customers.js';
import authRouter from './auth.js';
import profileRouter from './profile.js';
import cartRouter from './cart.js';

const router = Router();

router.use('/products', productsRouter);
router.use('/payments', paymentsRouter);
router.use('/customers', customersRouter);
router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/cart', cartRouter);

export default router;
