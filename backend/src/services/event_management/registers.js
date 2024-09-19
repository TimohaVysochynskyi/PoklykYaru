import { RegistersCollection } from '../../models/event_management/registers.js';

export const getAllRegisters = async () => {
  const registers = await RegistersCollection.find();

  return registers;
};
export const getRegisterById = async () => {
  return 0;
};

export const addRegister = async () => {
  return 0;
};

export const deleteRegister = async () => {
  return 0;
};
