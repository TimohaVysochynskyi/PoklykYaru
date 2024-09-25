import { CustomersCollection } from '../../models/merch/customer.js';

export const getAllCustomers = async () => {
  const customers = await CustomersCollection.find();

  return customers;
};
export const getCustomerById = async (customerId) => {
  const customer = await CustomersCollection.findOne({ _id: customerId });

  return customer;
};

export const deleteCustomer = async (customerId) => {
  const customer = await CustomersCollection.findOneAndDelete({
    _id: customerId,
  });

  return customer;
};
