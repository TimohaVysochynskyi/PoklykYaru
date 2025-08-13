import {
  loginAdmin,
  refreshAdmin,
  logoutAdmin,
} from '../../services/admin_management/auth.js';

export const loginAdminController = async (req, res, next) => {
  const data = await loginAdmin(req.body);

  res.status(200).send({
    status: 200,
    message: 'Successfully logged in an admin',
    admin: data.admin,
    accessToken: data.session.accessToken,
    refreshToken: data.session.refreshToken,
    sessionId: data.session._id,
  });
};

export const refreshAdminController = async (req, res, next) => {
  const data = await refreshAdmin({
    sessionId: req.body.sessionId,
    refreshToken: req.body.refreshToken,
  });

  res.status(200).send({
    status: 200,
    message: 'Successfully refreshed a session',
    admin: data.admin,
    accessToken: data.session.accessToken,
    refreshToken: data.session.refreshToken,
    sessionId: data.session._id,
  });
};

export const logoutAdminController = async (req, res, next) => {
  if (req.body.sessionId) {
    await logoutAdmin(req.body.sessionId);
  }

  res.status(204).send();
};
