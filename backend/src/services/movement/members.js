import { MembersCollection } from '../../models/movement/member.js';

export const getAllMembers = async () => {
  const members = await MembersCollection.find();

  return members;
};

export const getMemberById = async () => {
  return 0;
};

export const addMember = async () => {
  return 0;
};

export const updateMember = async () => {
  return 0;
};

export const deleteMember = async () => {
  return 0;
};
