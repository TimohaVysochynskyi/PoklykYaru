import { paymentFormHTML } from '../../utils/paymentFormHTML.js';
import { requestPaymentsArchive } from '../../utils/requestPaymentsArchive.js';
//import { addOrder } from './orders.js';

export const paymentForm = async (payload) => {
  const htmlForm = await paymentFormHTML(payload);

  return htmlForm;
};

export const getAllPayments = async () => {
  const payments = await requestPaymentsArchive();

  return payments;
};

export const getPaymentsById = async (customerId) => {
  const payments = await requestPaymentsArchive(customerId);
  return payments;
};
