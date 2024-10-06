import createHttpError from 'http-errors';

import {
  getAllItems,
  updateItem,
  deleteItem,
} from '../../services/merch/profile.js';

// User
export const getAllItemsController = async (req, res, next) => {
  const items = await getAllItems();

  res.status(200).send({
    status: 200,
    message: `Successfully found cart items`,
    data: items,
  });
};

export const updateItemController = async (req, res, next) => {
  const customerId = req.customer._id;

  const item = await updateItem(customerId, req.body);

  if (!item) {
    return next(createHttpError(404, 'Cart item not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully updated cart item`,
    data: item,
  });
};

export const deleteItemController = async (req, res, next) => {
  const item = await deleteItem(req.body);

  if (!item) {
    return next(createHttpError(404, 'Cart item not found'));
  }

  res.status(204).send();
};
