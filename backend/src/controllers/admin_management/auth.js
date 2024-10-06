import {
  loginAdmin,
  refreshAdmin,
  logoutAdmin,
} from '../../services/admin_management/auth.js';

import { THIRTY_DAYS } from '../../constants/index.js';

export const loginAdminController = async (req, res, next) => {
  const session = await loginAdmin(req.body);

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
    message: 'Successfully logged in an admin',
    data: { accessToken: session.accessToken },
  });
};

export const refreshAdminController = async (req, res, next) => {
  const session = await refreshAdmin({
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

export const logoutAdminController = async (req, res, next) => {
  if (req.cookies.sessionId) {
    await logoutAdmin(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
