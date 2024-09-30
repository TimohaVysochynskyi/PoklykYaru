import LiqPay from 'liqpay';
import { env } from './env.js';

const parseOrderData = (order) => {
  const customerId = order.customerId;
  const products = order.orderProducts.join('; ');
  const city = order.shippingAddress.city;
  const postOffice = order.shippingAddress.postOffice;
  const totalPrice = order.totalPrice;

  return {
    customerId,
    products,
    city,
    postOffice,
    totalPrice,
  };
};

export const paymentFormHTML = async (order) => {
  const { customerId, products, city, postOffice, totalPrice } =
    parseOrderData(order);
  const liqpay = new LiqPay(env('PUBLIC_KEY'), env('PRIVATE_KEY'));
  const htmlForm = liqpay.cnb_form({
    action: 'pay',
    amount: totalPrice,
    currency: 'UAH',
    description: 'Нове замовлення зі сторінки мерча',
    order_id: Date.now(),
    version: '3',
    lnguage: 'uk',
    customer: customerId,
    sender_city: city,
    sender_postal_code: postOffice,
    product_description: products,
  });

  return htmlForm;
};
