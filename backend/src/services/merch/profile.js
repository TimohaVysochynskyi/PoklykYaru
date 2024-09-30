import { CustomersCollection } from '../../models/merch/customer.js';

export const getProfile = async (profileId) => {
  const profile = await CustomersCollection.findOne({ _id: profileId });

  return profile;
};

export const updateProfile = async (profileId, payload, options = {}) => {
  const profile = await CustomersCollection.findOneAndUpdate(
    { _id: profileId },
    payload,
    { new: true, includeResultMetadata: false, ...options },
  );

  return profile;
};
export const deleteProfile = async (profileId) => {
  const profile = await CustomersCollection.findOneAndDelete({
    _id: profileId,
  });

  return profile;
};
