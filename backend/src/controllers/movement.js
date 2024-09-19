import createHttpError from 'http-errors';
import {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
} from '../services/movement/members.js';

// `members` controllers

export const getAllMembersController = async (req, res, next) => {
  const members = await getAllMembers();

  res.status(200).send({
    status: 200,
    message: 'Successfully found members',
    data: members,
  });
};

export const getMemberByIdController = async (req, res, next) => {
  const { id } = req.params;
  const member = await getMemberById(id);

  if (!member) {
    return next(createHttpError(404, 'Member not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found member with id ${id}`,
    data: member,
  });
};

export const addMemberController = async (req, res, next) => {
  const member = await addMember(req.body);

  res.status(201).send({
    status: 200,
    message: 'Successfully created a member',
    data: member,
  });
};

export const updateMemberController = async (req, res, next) => {
  const { id } = req.params;
  const member = await updateMember(id, req.body);

  if (!member) {
    return next(createHttpError(404, 'Member not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully updated a member with id ${id}`,
    data: member,
  });
};

export const deleteMemberController = async (req, res, next) => {
  const { id } = req.params;
  const member = await deleteMember(id);

  if (!member) {
    return next(createHttpError(404, 'Member not found'));
  }

  res.status(204).send();
};
