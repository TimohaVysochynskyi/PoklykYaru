import createHttpError from 'http-errors';
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../services/merch/products.js';

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
  const product = await addProduct(req.body);

  res.status(201).send({
    status: 200,
    message: 'Successfully created a product',
    data: product,
  });
};

export const updateProductController = async (req, res, next) => {
  const { id } = req.params;
  const product = await updateProduct(id, req.body);

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
