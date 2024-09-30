import LiqPay from 'liqpay';
import { env } from './env.js';

export const requestPaymentsArchive = async (customerId) => {
  const liqpay = new LiqPay(env('PUBLIC_KEY'), env('PRIVATE_KEY'));
  const payments = await liqpay.api('request', {
    action: 'reports',
    version: '3',
    date_from: '1727598224525',
    date_to: Date.now().toString(),
  });

  if (!customerId) {
    return payments.data;
  }

  const customerPayments = payments.data.filter(
    (payment) => payment.customer == customerId,
  );

  return customerPayments;
};
