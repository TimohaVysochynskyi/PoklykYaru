import {
  registerCustomer,
  loginCustomer,
  refreshCustomer,
  logoutCustomer,
  requestResetToken,
  resetPassword,
} from '../../services/merch/auth.js';

// User
export const registerCustomerController = async (req, res, next) => {
  const data = await registerCustomer(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfully registered a customer',
    customer: data.customer,
    accessToken: data.session.accessToken,
    refreshToken: data.session.refreshToken,
    sessionId: data.session._id,
  });
};

export const loginCustomerController = async (req, res, next) => {
  const data = await loginCustomer(req.body);

  res.status(200).send({
    status: 200,
    message: 'Successfully logged in a customer',
    customer: data.customer,
    accessToken: data.session.accessToken,
    refreshToken: data.session.refreshToken,
    sessionId: data.session._id,
  });
};

export const refreshCustomerController = async (req, res, next) => {
  const data = await refreshCustomer({
    sessionId: req.body.sessionId,
    refreshToken: req.body.refreshToken,
  });

  res.status(200).send({
    status: 200,
    message: 'Successfully refreshed a session',
    customer: data.customer,
    accessToken: data.session.accessToken,
    refreshToken: data.session.refreshToken,
    sessionId: data.session._id,
  });
};

export const logoutCustomerController = async (req, res, next) => {
  if (req.body.sessionId) {
    await logoutCustomer(req.body.sessionId);
  }

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
