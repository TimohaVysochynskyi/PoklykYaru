import createHttpError from 'http-errors';

import {
  getProfile,
  updateProfile,
  deleteProfile,
} from '../../services/merch/profile.js';

// User
export const getProfileController = async (req, res, next) => {
  const customerId = req.customer._id;

  const profile = await getProfile(customerId);

  if (!profile) {
    return next(createHttpError(404, 'Profile not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found customer with id ${customerId}`,
    data: profile,
  });
};

export const updateProfileController = async (req, res, next) => {
  const customerId = req.customer._id;

  const profile = await updateProfile(customerId, req.body);

  if (!profile) {
    return next(createHttpError(404, 'Profile not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully updated customer with id ${customerId}`,
    data: profile,
  });
};

export const deleteProfileController = async (req, res, next) => {
  const customerId = req.customer._id;
  const profile = await deleteProfile(customerId);

  if (!profile) {
    return next(createHttpError(404, 'Profile not found'));
  }

  res.status(204).send();
};
