import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { authAdmin } from '../../middlewares/authAdmin.js';

import {
  getAllMembersController,
  getMemberByIdController,
  addMemberController,
  updateMemberController,
  deleteMemberController,
} from '../../controllers/movement/members.js';

import {
  addMemberSchema,
  updateMemberSchema,
} from '../../validation/movement/members.js';

const router = Router();

// Admin
router.get('/', authAdmin, ctrlWrapper(getAllMembersController));
router.get('/:id', isValidId, authAdmin, ctrlWrapper(getMemberByIdController));
router.post(
  '/',
  authAdmin,
  validateBody(addMemberSchema),
  ctrlWrapper(addMemberController),
);
router.patch(
  '/:id',
  isValidId,
  authAdmin,
  validateBody(updateMemberSchema),
  ctrlWrapper(updateMemberController),
);
router.delete(
  '/:id',
  isValidId,
  authAdmin,
  ctrlWrapper(deleteMemberController),
);

export default router;
