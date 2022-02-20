import jwt from 'jsonwebtoken';
import { AdminModel } from '../../database/models/index.js';

const isValidAdminToken = async (value) => {
  const token = value.split(' ')[1];
  const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  if (!tokenData) throw new Error(tokenData);

  const isAdmin = await AdminModel.findOne({
    where: { email: tokenData.email },
  });
  if (!isAdmin) throw new Error('Unauthorized!');

  return true;
};

export default {
  isValidAdminToken,
};
