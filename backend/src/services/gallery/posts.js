import { PostsCollection } from '../../models/gallery/post.js';

export const getAllPosts = async () => {
  const posts = await PostsCollection.find();

  return posts;
};

export const addPost = async (payload) => {
  const post = await PostsCollection.create(payload);

  return post;
};

export const updatePost = async (postId, payload, options = {}) => {
  const post = await PostsCollection.findOneAndUpdate(
    { _id: postId },
    payload,
    {
      new: true,
      includeResultMetadata: false,
      ...options,
    },
  );

  return post;
};

export const deletePost = async (postId) => {
  const post = await PostsCollection.findOneAndDelete({ _id: postId });

  return post;
};
