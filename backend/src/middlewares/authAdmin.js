import createHttpError from 'http-errors';

import { SessionsCollection } from '../models/admin_management/session.js';
import { AdminsCollection } from '../models/admin_management/admin.js';

export const authAdmin = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await SessionsCollection.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
  }

  const admin = await AdminsCollection.findById(session.adminId);

  if (!admin) {
    next(createHttpError(401));
    return;
  }

  req.admin = admin;

  next();
};
