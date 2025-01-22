import LiqPay from 'liqpay';
import { env } from './env.js';

export const requestPaymentsArchive = async (customerId) => {
  const liqpay = new LiqPay(env('PUBLIC_KEY'), env('PRIVATE_KEY'));

  const payments = await liqpay.api('request', {
    action: 'reports',
    version: '3',
    date_from: '1725148800000',
    date_to: '1727654400000',
  });

  if (!customerId) {
    return payments.data;
  }

  const customerPayments = payments.data.filter(
    (payment) => payment.customer == customerId,
  );

  return customerPayments;
};
