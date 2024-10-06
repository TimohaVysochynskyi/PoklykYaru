import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { authAdmin } from '../../middlewares/authAdmin.js';

import {
  getAllPostsController,
  addPostController,
  updatePostController,
  deletePostController,
} from '../../controllers/gallery/posts.js';

import {
  addPostSchema,
  updatePostSchema,
} from '../../validation/gallery/posts.js';

const router = Router();

// User
router.get('/', ctrlWrapper(getAllPostsController));

// Admin
router.post(
  '/',
  authAdmin,
  validateBody(addPostSchema),
  ctrlWrapper(addPostController),
);
router.patch(
  '/:id',
  isValidId,
  authAdmin,
  validateBody(updatePostSchema),
  ctrlWrapper(updatePostController),
);
router.delete('/:id', isValidId, authAdmin, ctrlWrapper(deletePostController));

export default router;
