import bcrypt from 'bcrypt';
import crypto from 'crypto';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

import { CustomersCollection } from '../../models/merch/customer.js';
import { SessionsCollection } from '../../models/merch/session.js';

import { env } from '../../utils/env.js';
import { sendEmail } from '../../utils/sendMail.js';

import {
  FIFTEEN_MINUTES,
  THIRTY_DAYS,
  TEMPLATES_DIR,
  SMTP,
} from '../../constants/index.js';

export const registerCustomer = async (payload) => {
  const customer = await CustomersCollection.findOne({
    phoneNumber: payload.phoneNumber,
  });
  if (customer) throw createHttpError(409, 'Phone number in use');

  const encryptedPasword = await bcrypt.hash(payload.password, 10);

  await CustomersCollection.create({
    ...payload,
    password: encryptedPasword,
  });

  return loginCustomer({
    phoneNumber: payload.phoneNumber,
    password: payload.password,
  });
};

export const loginCustomer = async (payload) => {
  const customer = await CustomersCollection.findOne({
    phoneNumber: payload.phoneNumber,
  });
  if (!customer) throw createHttpError(404, 'Customer not found');

  const isEqual = await bcrypt.compare(payload.password, customer.password);
  if (!isEqual) throw createHttpError(401, 'Unauthorized');

  await SessionsCollection.deleteOne({ customerId: customer._id });

  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  const session = await SessionsCollection.create({
    customerId: customer._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return {
    customer,
    session,
  };
};

export const refreshCustomer = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) throw createHttpError(401, 'Session not found');

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired)
    throw createHttpError(401, 'Session token expired');

  const newAccessToken = crypto.randomBytes(30).toString('base64');
  const newRefreshToken = crypto.randomBytes(30).toString('base64');

  await SessionsCollection.deleteOne({ refreshToken });

  const newSession = await SessionsCollection.create({
    customerId: session.customerId,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  const customer = await CustomersCollection.findById(session.customerId);

  return {
    customer,
    session: newSession,
  };
};

export const logoutCustomer = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

export const requestResetToken = async (email) => {
  const user = await CustomersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '15m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.firstName,
    link: `${env('APP_DOMAIN')}/merch/auth/reset-password?token=${resetToken}`,
  });

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }

  const customer = await CustomersCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!customer) {
    throw createHttpError(404, 'Customer not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await CustomersCollection.updateOne(
    { _id: customer._id },
    { password: encryptedPassword },
  );
};
