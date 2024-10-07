import { CustomersCollection } from '../../models/merch/customer.js';

export const getAllItems = async (customerId) => {
  const customer = await CustomersCollection.findById(customerId).populate(
    'cart.product',
  );

  return customer.cart;
};

export const addItem = async (customerId, payload) => {
  const customer = await CustomersCollection.findById(customerId);

  const existingItem = customer.cart.find(
    (item) =>
      item.product.equals(payload.product) &&
      item.variation.size === payload.size &&
      item.variation.color === payload.color,
  );

  if (existingItem) {
    updateItem(customerId, payload);
  }

  customer.cart.push(payload);

  await customer.save();

  return customer.cart;
};

export const updateItem = async (customerId, payload) => {
  const customer = await CustomersCollection.findById(customerId);

  const item = customer.cart.find(
    (item) =>
      item.product.equals(payload.product) &&
      item.variation.size === payload.size &&
      item.variation.color === payload.color,
  );

  item.quantity += 1;
  item.price = item.product.price * item.quantity;

  await customer.save();

  return customer.cart;
};

export const deleteItem = async (customerId, payload) => {
  const customer = await CustomersCollection.findById(customerId);

  customer.cart = customer.cart.filter(
    (item) =>
      !(
        item.productId.equals(payload.product) &&
        item.variation.size === payload.size &&
        item.variation.color === payload.color
      ),
  );

  await customer.save();

  return customer.cart;
};
