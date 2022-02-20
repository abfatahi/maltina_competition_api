import { SchoolModel } from '../../database/models/index.js';

const isUniqueName = async (name) => {
  const nameExist = await SchoolModel.findOne({ name });
  if (nameExist) throw new Error('Failed! School name already in use');

  return true;
};

const isUniqueEmail = async (email) => {
  const emailExist = await SchoolModel.findOne({ email });
  if (emailExist) throw new Error('Failed! Email already in use');

  return true;
};

const isUniquePhoneNumber = async (phoneNumber) => {
  const phoneNumberExist = await SchoolModel.findOne({ phoneNumber });
  if (phoneNumberExist) throw new Error('Failed! Phone number already in use');

  return true;
};

export default {
  isUniqueName,
  isUniqueEmail,
  isUniquePhoneNumber,
};
