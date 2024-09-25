import { ProductsCollection } from '../../models/merch/product.js';

export const getAllProducts = async () => {
  const products = await ProductsCollection.find();

  return products;
};

export const getProductById = async (productId) => {
  const product = await ProductsCollection.findOne({ _id: productId });

  return product;
};

export const addProduct = async (payload) => {
  const product = await ProductsCollection.create(payload);

  return product;
};
export const updateProduct = async (productId, payload, options = {}) => {
  const product = await ProductsCollection.findOneAndUpdate(
    { _id: productId },
    payload,
    { new: true, includeResultMetadata: false, ...options },
  );

  return product;
};
export const deleteProduct = async (productId) => {
  const product = await ProductsCollection.findOneAndDelete({ _id: productId });

  return product;
};
