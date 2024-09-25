import { Router } from 'express';

import merchRouter from './merch/index.js';
import movementRouter from './movement/index.js';
import event_managementRouter from './event_management/index.js';

const router = Router();

router.use('/merch', merchRouter);
router.use('/movement', movementRouter);
router.use('/event-management', event_managementRouter);

export default router;
