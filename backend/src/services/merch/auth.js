import bcrypt from 'bcrypt';
import crypto from 'crypto';
import createHttpError from 'http-errors';

import { CustomersCollection } from '../../models/merch/customer.js';
import { SessionsCollection } from '../../models/merch/session.js';

import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../../constants/index.js';

export const registerCustomer = async (payload) => {
  const customer = await CustomersCollection.findOne({
    phoneNumber: payload.phoneNumber,
  });
  if (customer) throw createHttpError(409, 'Phone number in use');

  const encryptedPasword = await bcrypt.hash(payload.password, 10);

  return await CustomersCollection.create({
    ...payload,
    password: encryptedPasword,
  });
};

export const loginCustomer = async (payload) => {
  const customer = CustomersCollection.findOne({
    phoneNumber: payload.phoneNumber,
  });
  if (!customer) throw createHttpError(404, 'Customer not found');

  const isEqual = await bcrypt.compare(payload.password, customer.password);
  if (!isEqual) throw createHttpError(401, 'Unauthorized');

  await SessionsCollection.deleteOne({ customerId: customer._id });

  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    customerId: customer._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidIntil: new Date(Date.now() + THIRTY_DAYS),
  });
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

  const newSession = {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionsCollection.create({
    customerId: session.customerId,
    ...newSession,
  });
};

export const logoutCustomer = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};
