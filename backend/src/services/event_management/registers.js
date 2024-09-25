import { RegistersCollection } from '../../models/event_management/registers.js';

export const getAllRegisters = async () => {
  const registers = await RegistersCollection.find();

  return registers;
};
export const getRegisterById = async (registerId) => {
  const register = await RegistersCollection.findOne({ _id: registerId });

  return register;
};

export const addRegister = async (payload) => {
  const register = await RegistersCollection.create(payload);

  return register;
};

export const deleteRegister = async (registerId) => {
  const register = await RegistersCollection.findOneAndDelete({
    _id: registerId,
  });

  return register;
};
