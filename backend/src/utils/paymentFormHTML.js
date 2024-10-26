import LiqPay from 'liqpay';
import { env } from './env.js';

const parseOrderData = (order) => {
  const customerId = order.customerId;
  const products = JSON.stringify(order.orderProducts);
  const totalPrice = order.totalPrice;

  return {
    customerId,
    products,
    totalPrice,
  };
};

export const paymentFormHTML = async (order) => {
  const { customerId, products, totalPrice } = parseOrderData(order);
  const liqpay = new LiqPay(env('PUBLIC_KEY'), env('PRIVATE_KEY'));
  const htmlForm = liqpay.cnb_object({
    action: 'pay',
    amount: totalPrice,
    currency: 'UAH',
    description: 'Нове замовлення зі сторінки мерча',
    order_id: Date.now(),
    version: '3',
    lnguage: 'uk',
    result_url: `http://merch.${env('CLIENT_DOMAIN')}`,
    customer_user_id: customerId,
    product_description: products,
  });

  return htmlForm;
};
