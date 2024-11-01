import { CustomersCollection } from '../../models/merch/customer.js';
import { ProductsCollection } from '../../models/merch/product.js';
import { getProductById } from './products.js';

const getProductData = async (cart) => {
  const response = [];
  for (let i = 0; i < cart.length; i++) {
    let cartItem = cart[i].toObject();
    const product = await getProductById(cartItem.product);

    cartItem.productData = product;

    response.push(cartItem);
  }

  return response;
};

export const getAllItems = async (customerId) => {
  const customer = await CustomersCollection.findById(customerId);
  const cart = customer.cart;

  const cartData = await getProductData(cart);

  return cartData;
};

export const addItem = async (customerId, payload) => {
  const customer = await CustomersCollection.findById(customerId);
  const product = await ProductsCollection.findById(payload.product);

  const existingItem = customer.cart.find(
    (item) =>
      item.product.equals(payload.product) &&
      JSON.stringify(item.variation) == JSON.stringify(payload.variation),
  );

  if (existingItem) {
    return updateItem(customerId, { ...payload, action: 'increment' });
  }

  const cartItem = { ...payload, price: payload.quantity * product.price };

  customer.cart.push(cartItem);

  await customer.save();

  const cartData = await getProductData(customer.cart);

  return cartData;
};

export const updateItem = async (customerId, payload) => {
  const customer = await CustomersCollection.findById(customerId);
  const product = await ProductsCollection.findById(payload.product);
  const action = payload.action;

  const cartItem = customer.cart.find(
    (item) =>
      item.product.equals(payload.product) &&
      JSON.stringify(item.variation) == JSON.stringify(payload.variation),
  );

  if (!cartItem) {
    return 'Cart item not found';
  }

  switch (action) {
    case 'increment':
      cartItem.quantity += 1;
      cartItem.price = product.price * cartItem.quantity;
      break;
    case 'decrement':
      cartItem.quantity -= 1;
      cartItem.price = product.price * cartItem.quantity;
      break;
    case 'size':
      cartItem.variation.size = payload.newVariation.size;
      break;
    case 'color':
      cartItem.variation.color = payload.newVariation.color;
      break;

    default:
      cartItem.quantity += 1;
      cartItem.price = product.price * cartItem.quantity;
      break;
  }

  await customer.save();

  const cartData = await getProductData(customer.cart);

  return cartData;
};

export const deleteItem = async (customerId, payload) => {
  const customer = await CustomersCollection.findById(customerId);

  customer.cart = customer.cart.filter(
    (item) =>
      !(
        item.product.equals(payload.product) &&
        JSON.stringify(item.variation) == JSON.stringify(payload.variation)
      ),
  );

  await customer.save();

  const cartData = await getProductData(customer.cart);

  return cartData;
};
