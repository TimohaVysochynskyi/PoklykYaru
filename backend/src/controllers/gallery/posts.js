import createHttpError from 'http-errors';
import {
  getAllPosts,
  addPost,
  updatePost,
  deletePost,
} from '../../services/gallery/posts.js';

// User & Admin
export const getAllPostsController = async (req, res, next) => {
  const posts = await getAllPosts();

  res.status(200).send({
    status: 200,
    message: 'Successfully found posts',
    data: posts,
  });
};

// Admin
export const addPostController = async (req, res, next) => {
  const post = await addPost(req.body);

  res.status(201).send({
    status: 200,
    message: 'Successfully created a post',
    data: post,
  });
};

export const updatePostController = async (req, res, next) => {
  const { id } = req.params;
  const post = await updatePost(id, req.body);

  if (!post) {
    return next(createHttpError(404, 'Post not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully updated a post with id ${id}`,
    data: post,
  });
};

export const deletePostController = async (req, res, next) => {
  const { id } = req.params;
  const post = await deletePost(id);

  if (!post) {
    return next(createHttpError(404, 'Post not found'));
  }

  res.status(204).send();
};
