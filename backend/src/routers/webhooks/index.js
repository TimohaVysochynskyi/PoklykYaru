import { Router } from 'express';

import paymentsRouter from '../merch/payments.js';

const router = Router();

// expose Monobank webhook under unified path if desired in future
router.use('/merch/payments', paymentsRouter);

export default router;
