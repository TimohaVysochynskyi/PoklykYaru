import axios from 'axios';
import crypto from 'crypto';
import { env } from '../../utils/env.js';
import { OrdersCollection } from '../../models/merch/order.js';

const MONO_API = 'https://api.monobank.ua/api';

const getConfig = () => {
  const token = process.env.MONOBANK_TOKEN;
  if (!token) throw new Error('Missing MONOBANK_TOKEN');
  const siteBase = env('CLIENT_DOMAIN');
  const publicUrl = env('APP_PUBLIC_URL', siteBase);
  return { token, siteBase, publicUrl };
};

const signMono = (token, body) => {
  const key = Buffer.from(token);
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(body);
  return hmac.digest('base64');
};

export const createInvoice = async ({
  customerId,
  orderProducts,
  totalPrice,
}) => {
  const { token, siteBase, publicUrl } = getConfig();
  // Create order in DB with pending status
  const orderDoc = await OrdersCollection.create({
    customer: customerId,
    items: orderProducts.map((p) => ({
      product: p.product,
      variation: p.variation,
      quantity: p.quantity,
      price: p.price,
    })),
    totalPrice,
    status: 'pending',
  });

  // Prepare invoice request (amount in kopecks)
  // Normalize: if price looks like kopecks (very large), don't multiply by 100
  const toKopecks = (priceUAHOrKop, qty) => {
    if (priceUAHOrKop == null) return 0;
    // Heuristic: treat numbers >= 10000 as already in kopecks (>= 100 UAH)
    const isKopecks = priceUAHOrKop >= 10000;
    const perUnit = isKopecks
      ? Math.round(priceUAHOrKop)
      : Math.round(priceUAHOrKop * 100);
    return perUnit * qty;
  };

  const amount = orderProducts.reduce(
    (acc, p) => acc + toKopecks(p.price, p.quantity),
    0,
  );
  const reference = String(orderDoc._id);
  const data = {
    amount,
    ccy: 980,
    merchantPaymInfo: {
      reference,
      destination: 'Оплата мерчу PoklykYaru',
      comment: `Order ${reference}`,
      basketOrder: orderProducts.map((p) => ({
        name: String(p.product),
        qty: p.quantity,
        sum: toKopecks(p.price, p.quantity),
        unit: 'шт',
      })),
    },
    redirectUrl: `${siteBase}/merch`,
    webHookUrl: `${publicUrl}/api/merch/payments/webhook`,
    validity: 3600,
  };

  const body = JSON.stringify(data);

  const res = await axios.post(`${MONO_API}/merchant/invoice/create`, body, {
    headers: {
      'Content-Type': 'application/json',
      'X-Token': token,
    },
  });

  const { invoiceId, pageUrl } = res.data;

  orderDoc.invoiceId = invoiceId;
  orderDoc.invoiceUrl = pageUrl;
  orderDoc.reference = reference;
  await orderDoc.save();

  return {
    invoiceUrl: pageUrl,
    invoiceId,
    reference,
    orderId: orderDoc._id.toString(),
  };
};

export const handleWebhook = async (headers, rawBody) => {
  const { token } = getConfig();
  const signature = headers['x-signature'] || headers['X-Signature'];
  const body = typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody);
  const expected = signMono(token, body);

  if (!signature || signature !== expected) {
    throw new Error('Invalid signature');
  }

  // Payload may contain invoice status updates
  const payload = JSON.parse(body);
  const { invoiceId, status, failureReason } = payload;
  if (!invoiceId) return;

  const order = await OrdersCollection.findOne({ invoiceId });
  if (!order) return;

  let mapped = 'pending';
  switch (status) {
    case 'success':
    case 'processed':
      mapped = 'paid';
      break;
    case 'expired':
      mapped = 'expired';
      break;
    case 'failure':
    case 'reversed':
    case 'hold_error':
    case 'canceled':
      mapped = 'failed';
      break;
    default:
      mapped = 'pending';
  }

  order.status = mapped;
  order.payment = payload;
  if (failureReason) order.paymentFailureReason = failureReason;
  await order.save();
};

export const getAllOrders = async () => {
  const orders = await OrdersCollection.find().sort({ createdAt: -1 });
  return orders;
};

export const getOrdersByCustomer = async (customerId) => {
  const orders = await OrdersCollection.find({ customer: customerId }).sort({
    createdAt: -1,
  });
  return orders;
};
