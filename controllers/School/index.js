import { validationResult } from 'express-validator';
import { SchoolModel } from '../../database/models/index.js';

export default () => {
  const register = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      const {
        name,
        email,
        address,
        phoneNumber,
        facebookId,
        motto,
        yearFounded,
        teamName,
        gameMaster,
      } = req.body;

      //convert Email to lowercase
      const new_email = email.toLowerCase();

      const newSchool = new SchoolModel({
        name,
        email: new_email,
        address,
        phoneNumber,
        facebookId,
        motto,
        yearFounded,
        teamName,
        gameMaster,
      });

      newSchool.save();

      return res.status(200).json({
        status: 'success',
        data: {
          name,
          new_email,
          address,
          phoneNumber,
          facebookId,
          motto,
          yearFounded,
          teamName,
          gameMaster,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  return {
    register,
  };
};
