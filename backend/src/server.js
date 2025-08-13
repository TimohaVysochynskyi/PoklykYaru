import express from 'express';
import cors from 'cors';
//import pino from 'pino-http';

import { env } from './utils/env.js';

import router from './routers/index.js';
import { monobankWebhookController } from './controllers/merch/payments.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import { UPLOAD_DIR } from './constants/index.js';

import cookieParser from 'cookie-parser';

export const setupServer = () => {
  const PORT = Number(env('PORT', '3000'));

  const app = express();
  // Monobank webhook must receive raw body for signature verification
  app.post(
    '/api/merch/payments/webhook',
    express.raw({ type: 'application/json' }),
    monobankWebhookController,
  );
  app.use(express.json());
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(
    cors({
      origin: env('CLIENT_DOMAIN'),
      credentials: true,
    }),
  );
  //app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(cookieParser());

  app.use('/api', router);
  // Optional: mount webhooks namespace to avoid auth/cors middlewares interference
  // Keep after JSON middleware so body is parsed for signature validation
  // If Monobank requires raw body, switch to express.raw for this route only.
  // app.use('/api/webhooks', webhooksRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
