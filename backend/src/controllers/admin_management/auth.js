import {
  loginAdmin,
  refreshAdmin,
  logoutAdmin,
} from '../../services/admin_management/auth.js';

import { THIRTY_DAYS } from '../../constants/index.js';

export const loginAdminController = async (req, res, next) => {
  const data = await loginAdmin(req.body);

  res.cookie('adminRefreshToken', data.session.refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('adminSessionId', data.session._id, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(200).send({
    status: 200,
    message: 'Successfully logged in an admin',
    admin: data.admin,
    accessToken: data.session.accessToken,
  });
};

export const refreshAdminController = async (req, res, next) => {
  const data = await refreshAdmin({
    sessionId: req.cookies.adminSessionId,
    refreshToken: req.cookies.adminRefreshToken,
  });

  res.cookie('adminRefreshToken', data.session.refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('adminSessionId', data.session._id, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(200).send({
    status: 200,
    message: 'Successfully refreshed a session',
    admin: data.admin,
    accessToken: data.session.accessToken,
  });
};

export const logoutAdminController = async (req, res, next) => {
  if (req.cookies.adminSessionId) {
    await logoutAdmin(req.cookies.adminSessionId);
  }

  res.clearCookie('adminSessionId');
  res.clearCookie('adminRefreshToken');

  res.status(204).send();
};
