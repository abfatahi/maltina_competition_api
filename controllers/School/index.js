import jwt from 'jsonwebtoken';
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

      //Generate Unique ID
      const allSchools = await SchoolModel.find();
      const schoolId = `MSG2022-00000${allSchools.length + 1}`;

      //Register New School
      const newSchool = new SchoolModel({
        schoolId,
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

      // Generate customer token
      const token = jwt.sign({ email: new_email }, process.env.JWT_SECRET, {
        expiresIn: '5d',
      });

      return res.status(200).json({
        status: 'success',
        data: {
          schoolId,
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
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  return {
    register,
  };
};
