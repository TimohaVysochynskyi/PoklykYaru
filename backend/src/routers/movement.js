import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js ';

import {
  getAllMembersController,
  getMemberByIdController,
  addMemberController,
  updateMemberController,
  deleteMemberController,
} from '../controllers/movement.js';

import { addMemberSchema, updateMemberSchema } from '../validation/movement.js';

const router = Router();

// `member` routes

router.get('/members', ctrlWrapper(getAllMembersController));
router.get('/members/:id', isValidId, ctrlWrapper(getMemberByIdController));
router.post(
  '/members',
  validateBody(addMemberSchema),
  ctrlWrapper(addMemberController),
);
router.patch(
  '/members/:id',
  isValidId,
  validateBody(updateMemberSchema),
  ctrlWrapper(updateMemberController),
);
router.delete('/members/:id', isValidId, ctrlWrapper(deleteMemberController));

export default router;
