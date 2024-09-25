import createHttpError from 'http-errors';

import {
  getAllCustomers,
  getCustomerById,
} from '../../services/merch/customers.js';

// Admin
export const getAllCustomersController = async (req, res, next) => {
  const customers = await getAllCustomers();

  res.status(200).send({
    status: 200,
    message: 'Successfully found customers',
    data: customers,
  });
};

export const getCustomerByIdController = async (req, res, next) => {
  const { id } = req.params;
  const customer = await getCustomerById(id);

  if (!customer) {
    return next(createHttpError(404, 'Customer not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found customer with id ${id}`,
    data: customer,
  });
};
