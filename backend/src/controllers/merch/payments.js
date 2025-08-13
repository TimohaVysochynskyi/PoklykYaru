import createHttpError from 'http-errors';
import {
  createInvoice,
  handleWebhook,
  getAllOrders,
  getOrdersByCustomer,
} from '../../services/merch/payments.js';

export const createPaymentInvoiceController = async (req, res, next) => {
  try {
    const customerId = req.customer._id.toString();
    const payload = req.body;

    const { invoiceUrl, invoiceId, reference, orderId } = await createInvoice({
      customerId,
      ...payload,
    });

    res.status(201).json({
      status: 201,
      message: 'Invoice created',
      data: { invoiceUrl, invoiceId, reference, orderId },
    });
  } catch (e) {
    // If Monobank returned a 4xx with details, forward it for easier debugging
    const details = e?.response?.data;
    if (details) {
      return next(
        createHttpError(400, 'Monobank rejected invoice', { details }),
      );
    }
    next(e);
  }
};

export const monobankWebhookController = async (req, res, next) => {
  try {
    const raw =
      req.body instanceof Buffer
        ? req.body.toString('utf8')
        : JSON.stringify(req.body);
    await handleWebhook(req.headers, raw);
    res.status(200).json({ ok: true });
  } catch (e) {
    next(createHttpError(400, e.message || 'Invalid webhook'));
  }
};

export const getAllOrdersController = async (req, res, next) => {
  const orders = await getAllOrders();
  res.status(200).send({
    status: 200,
    message: 'Successfully found orders',
    data: orders,
  });
};

export const getMyOrdersController = async (req, res, next) => {
  const customerId = req.customer._id;
  const orders = await getOrdersByCustomer(customerId);
  res.status(200).send({
    status: 200,
    message: `Successfully found orders of customer ${customerId}`,
    data: orders,
  });
};
