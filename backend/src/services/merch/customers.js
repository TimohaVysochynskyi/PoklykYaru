import { CustomersCollection } from '../../models/merch/customer.js';

export const getAllCustomers = async () => {
  const customers = await CustomersCollection.find();

  return customers;
};
export const getCustomerById = async () => {
  return 0;
};

export const deleteCustomer = async () => {
  return 0;
};
