import { ProductsCollection } from '../../models/merch/product.js';

export const getAllProducts = async () => {
  const products = await ProductsCollection.find();

  return products;
};

export const getProductById = async () => {
  return 0;
};

export const addProduct = async () => {
  return 0;
};
export const updateProduct = async () => {
  return 0;
};
export const deleteProduct = async () => {
  return 0;
};
