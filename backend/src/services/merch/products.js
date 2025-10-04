import { ProductsCollection } from '../../models/merch/product.js';
import { ProductCategoriesCollection } from '../../models/merch/product_сategories.js';
import { deleteMultipleFromCloudinary } from '../../utils/cloudinary.js';

const populateCategory = async (value) => {
  const category = await ProductCategoriesCollection.findById(value);

  return category.name;
};
const getIdCategory = async (value) => {
  const category = await ProductCategoriesCollection.findOne({ name: value });

  if (!category) {
    throw new Error(`Category with name "${value}" not found`);
  }

  return category._id;
};

export const getAllProducts = async () => {
  const products = await ProductsCollection.find();

  const result = [];

  for (let i = 0; i < products.length; i++) {
    const product = products[i].toObject();
    product.category = await populateCategory(product.category);
    result.push(product);
  }

  return result;
};

export const getProductById = async (productId) => {
  const response = await ProductsCollection.findOne({
    _id: productId,
  });

  const product = response.toObject();
  product.category = await populateCategory(product.category);

  return product;
};

export const addProduct = async (payload) => {
  // Convert category name to ObjectId before saving
  if (payload.category) {
    payload.category = await getIdCategory(payload.category);
  }

  const product = await ProductsCollection.create(payload);

  return product;
};
export const updateProduct = async (productId, payload, options = {}) => {
  payload.category = await getIdCategory(payload.category);
  const response = await ProductsCollection.findOneAndUpdate(
    { _id: productId },
    payload,
    { new: true, includeResultMetadata: false, ...options },
  );
  const product = response.toObject();
  product.category = await populateCategory(product.category);
  return product;
};
export const deleteProduct = async (productId) => {
  const product = await ProductsCollection.findOneAndDelete({ _id: productId });

  if (product && product.images && product.images.length > 0) {
    // Delete images from Cloudinary
    await deleteMultipleFromCloudinary(product.images);
  }

  return product;
};

export const getAllCategories = async () => {
  const categories = await ProductCategoriesCollection.find();

  return categories;
};

export const addCategory = async (payload) => {
  const category = await ProductCategoriesCollection.create(payload);

  return category;
};

export const updateCategory = async (categoryId, payload) => {
  const category = await ProductCategoriesCollection.findByIdAndUpdate(
    categoryId,
    payload,
    { new: true },
  );

  return category;
};

export const deleteCategory = async (categoryId) => {
  const category = await ProductCategoriesCollection.findByIdAndDelete(
    categoryId,
  );

  return category;
};
