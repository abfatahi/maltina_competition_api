import { SchoolModel } from '../../database/models/index.js';

const isUniqueEmail = async (email) => {
  const emailExist = await SchoolModel.findOne({ email });
  if (emailExist) throw new Error('Failed! Email already in use');

  return true;
};

export default {
  isUniqueEmail,
};
