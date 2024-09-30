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
  const customer = await registerCustomer(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfully registered a customer',
    data: customer,
  });
};

export const loginCustomerController = async (req, res, next) => {
  const session = await loginCustomer(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(200).send({
    status: 200,
    message: 'Successfully logged in a customer',
    data: { accessToken: session.accessToken },
  });
};

export const refreshCustomerController = async (req, res, next) => {
  const session = await refreshCustomer({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(200).send({
    status: 200,
    message: 'Successfully refreshed a session',
    data: { accessToken: session.accessToken },
  });
};

export const logoutCustomerController = async (req, res, next) => {
  if (req.cookies.sessionId) {
    await logoutCustomer(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

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
