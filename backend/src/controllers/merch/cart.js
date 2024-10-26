import createHttpError from 'http-errors';

import {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
} from '../../services/merch/cart.js';

// User
export const getAllItemsController = async (req, res, next) => {
  const customerId = req.customer._id;
  const items = await getAllItems(customerId);

  if (!items) {
    return next(createHttpError(404, 'Cart items not found'));
  }

  res
    .status(200)
    .send({ status: 200, message: 'Successfully found items', data: items });
};

export const addItemController = async (req, res, next) => {
  const customerId = req.customer._id;
  const items = await addItem(customerId, req.body);

  res
    .status(200)
    .send({ status: 200, message: 'Successfully added an item', data: items });
};

export const updateItemController = async (req, res, next) => {
  const customerId = req.customer._id;

  const items = await updateItem(customerId, req.body);

  if (!items) {
    return next(createHttpError(404, 'Cart item not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully updated cart item`,
    data: items,
  });
};

export const deleteItemController = async (req, res, next) => {
  const customerId = req.customer._id;
  const items = await deleteItem(customerId, req.body);

  if (!items) {
    return next(createHttpError(404, 'Cart item not found'));
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully deleted an item',
    data: items,
  });
};
