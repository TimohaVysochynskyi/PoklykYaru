//import createHttpError from 'http-errors';

import {
  paymentForm,
  getAllPayments,
  getPaymentsById,
} from '../../services/merch/payments.js';

export const paymentFormController = async (req, res, next) => {
  const customerId = req.customer._id.toString();
  const payload = req.body;

  const html = await paymentForm({ customerId, ...payload });

  res.status(200).send(html);
};

export const getAllPaymentsController = async (req, res, next) => {
  const payments = await getAllPayments();

  res.status(200).send({
    status: 200,
    message: 'Successfully found payments',
    data: payments,
  });
};

export const getPaymentsByIdController = async (req, res, next) => {
  const { id } = req.params;
  const payments = await getPaymentsById(id);

  res.status(200).send({
    status: 200,
    message: `Successfully found payments with id ${id}`,
    data: payments,
  });
};