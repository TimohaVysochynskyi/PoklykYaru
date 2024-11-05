import {
  registerCustomer,
  loginCustomer,
  refreshCustomer,
  logoutCustomer,
  requestResetToken,
  resetPassword,
} from '../../services/merch/auth.js';

import { THIRTY_DAYS } from '../../constants/index.js';

// User
export const registerCustomerController = async (req, res, next) => {
  const data = await registerCustomer(req.body);

  res.cookie('customerRefreshToken', data.session.refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('customerSessionId', data.session._id, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(201).send({
    status: 201,
    message: 'Successfully registered a customer',
    customer: data.customer,
    accessToken: data.session.accessToken,
  });
};

export const loginCustomerController = async (req, res, next) => {
  const data = await loginCustomer(req.body);

  res.cookie('customerRefreshToken', data.session.refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('customerSessionId', data.session._id, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(200).send({
    status: 200,
    message: 'Successfully logged in a customer',
    customer: data.customer,
    accessToken: data.session.accessToken,
  });
};

export const refreshCustomerController = async (req, res, next) => {
  const data = await refreshCustomer({
    sessionId: req.cookies.customerSessionId,
    refreshToken: req.cookies.customerRefreshToken,
  });

  res.cookie('customerRefreshToken', data.session.refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('customerSessionId', data.session._id, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(200).send({
    status: 200,
    message: 'Successfully refreshed a session',
    customer: data.customer,
    accessToken: data.session.accessToken,
  });
};

export const logoutCustomerController = async (req, res, next) => {
  if (req.cookies.customerSessionId) {
    await logoutCustomer(req.cookies.customerSessionId);
  }

  res.clearCookie('customerSessionId');
  res.clearCookie('customerRefreshToken');

  res.status(204).send();
};

export const requestResetEmailController = async (req, res, next) => {
  await requestResetToken(req.body.email);

  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res, next) => {
  await resetPassword(req.body);

  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
