import { Router } from 'express';

import eventsRouter from './events.js';
import registersRouter from './registers.js';

const router = Router();

router.use('/events', eventsRouter);
router.use('/registers', registersRouter);

export default router;
