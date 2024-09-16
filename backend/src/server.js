import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env.js';

import merchRouter from './routers/merch.js';
import movementRouter from './routers/movement.js';
import eventRouter from './routers/event_management.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

export const setupServer = () => {
  const PORT = Number(env('PORT', '3000'));

  const app = express();
  app.use(express.json());

  app.use(cors());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(cookieParser());

  app.get('/merch', merchRouter);
  app.get('/movement', movementRouter);
  app.get('/events', eventRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
