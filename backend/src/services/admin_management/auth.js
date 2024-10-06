import bcrypt from 'bcrypt';
import crypto from 'crypto';
import createHttpError from 'http-errors';

import { AdminsCollection } from '../../models/admin_management/admin.js';
import { SessionsCollection } from '../../models/admin_management/session.js';

import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../../constants/index.js';

export const loginAdmin = async (payload) => {
  const admin = await AdminsCollection.findOne({
    psevdo: payload.psevdo,
  });
  if (!admin) throw createHttpError(404, 'Admin not found');

  const isEqual = await bcrypt.compare(payload.password, admin.password);
  if (!isEqual) throw createHttpError(401, 'Unauthorized');

  await SessionsCollection.deleteOne({ adminId: admin._id });

  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    adminId: admin._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const refreshAdmin = async ({ sessionId, refreshToken }) => {
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
    adminId: session.adminId,
    ...newSession,
  });
};

export const logoutAdmin = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};
