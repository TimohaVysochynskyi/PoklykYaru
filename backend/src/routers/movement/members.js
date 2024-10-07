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

router.use('/', authAdmin);

// Admin
router.get('/', ctrlWrapper(getAllMembersController));
router.get('/:id', isValidId, ctrlWrapper(getMemberByIdController));
router.post(
  '/',
  validateBody(addMemberSchema),
  ctrlWrapper(addMemberController),
);
router.patch(
  '/:id',
  isValidId,
  validateBody(updateMemberSchema),
  ctrlWrapper(updateMemberController),
);
router.delete('/:id', isValidId, ctrlWrapper(deleteMemberController));

export default router;
