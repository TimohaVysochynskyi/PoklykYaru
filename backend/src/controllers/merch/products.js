import createHttpError from 'http-errors';
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../../services/merch/products.js';
import { uploadMultipleToCloudinary } from '../../utils/cloudinary.js';
import fs from 'node:fs/promises';

// User & Admin
export const getAllProductsController = async (req, res, next) => {
  const products = await getAllProducts();

  res.status(200).send({
    status: 200,
    message: 'Successfully found products',
    data: products,
  });
};

export const getProductByIdController = async (req, res, next) => {
  const { id } = req.params;
  const product = await getProductById(id);

  if (!product) {
    return next(createHttpError(404, 'Product not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found product with id ${id}`,
    data: product,
  });
};

// Admin
export const addProductController = async (req, res, next) => {
  const images = req.files;

  const payload = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    composition: req.body.composition,
    category: req.body.category,
    variations: req.body.variations,
    stock: req.body.stock,
  };

  let imagesUrls = [];

  if (images && images.length > 0) {
    // Upload to Cloudinary
    imagesUrls = await uploadMultipleToCloudinary(images, 'PoklykYaru/merch');

    // Clean up temporary files
    await Promise.all(
      images.map((file) =>
        fs
          .unlink(file.path)
          .catch((err) => console.error('Error deleting temp file:', err)),
      ),
    );
  }

  const product = await addProduct({ ...payload, images: imagesUrls });

  res.status(201).send({
    status: 200,
    message: 'Successfully created a product',
    data: product,
  });
};

export const updateProductController = async (req, res, next) => {
  const { id } = req.params;

  const payload = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    composition: req.body.composition,
    category: req.body.category,
    variations: req.body.variations,
    stock: req.body.stock,
  };

  const product = await updateProduct(id, payload, {
    upsert: true,
  });

  if (!product) {
    return next(createHttpError(404, 'Product not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully updated a product with id ${id}`,
    data: product,
  });
};

export const deleteProductController = async (req, res, next) => {
  const { id } = req.params;
  const product = await deleteProduct(id);

  if (!product) {
    return next(createHttpError(404, 'Product not found'));
  }

  res.status(204).send();
};

export const getAllCategoriesController = async (req, res, next) => {
  const categories = await getAllCategories();

  res.status(200).send({
    status: 200,
    message: 'Successfully found categories',
    data: categories,
  });
};

export const addCategoryController = async (req, res, next) => {
  const category = await addCategory(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfully created new category',
    data: category,
  });
};

export const updateCategoryController = async (req, res, next) => {
  const { id } = req.params;
  const category = await updateCategory(id, req.body);

  if (!category) {
    return next(createHttpError(404, 'Category not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully updated category with id ${id}`,
    data: category,
  });
};

export const deleteCategoryController = async (req, res, next) => {
  const { id } = req.params;
  const category = await deleteCategory(id);

  if (!category) {
    return next(createHttpError(404, 'Category not found'));
  }

  res.status(204).send();
};
