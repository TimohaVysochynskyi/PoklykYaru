import { MembersCollection } from '../../models/movement/member.js';

export const getAllMembers = async () => {
  const members = await MembersCollection.find();

  return members;
};

export const getMemberById = async (memberId) => {
  const member = await MembersCollection.findOne({ _id: memberId });

  return member;
};

export const addMember = async (payload) => {
  const member = await MembersCollection.create(payload);

  return member;
};

export const updateMember = async (memberId, payload, options = {}) => {
  const member = await MembersCollection.findByIdAndUpdate(
    { _id: memberId },
    payload,
    { new: true, includeResultMetadata: false, ...options },
  );

  return member;
};

export const deleteMember = async (memberId) => {
  const member = await MembersCollection.findByIdAndDelete({ _id: memberId });

  return member;
};
