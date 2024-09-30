import createHttpError from 'http-errors';

import { SessionsCollection } from '../models/merch/session.js';
import { CustomersCollection } from '../models/merch/customer.js';

export const authCustomer = async (req, res, next) => {
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

  const customer = await CustomersCollection.findById(session.customerId);

  if (!customer) {
    next(createHttpError(401));
    return;
  }

  req.customer = customer;

  next();
};
