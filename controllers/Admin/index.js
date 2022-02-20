import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import {
  AdminModel,
  SchoolModel,
  ParticipantModel,
} from '../../database/models/index.js';

export default () => {
  const register = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      const { name, email, password } = req.body;

      //convert Email to lowercase
      const new_email = email.toLowerCase();

      //hash password
      const new_password = await bcrypt.hash(password, bcrypt.genSaltSync(10));

      //Register New Admin
      const newAdmin = new AdminModel({
        name,
        email: new_email,
        password: new_password,
      });
      newAdmin.save();

      return res.status(200).json({
        status: 'success',
        data: {
          name,
          new_email,
          role: newAdmin.role,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const login = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      // Authentication Logic
      const { email, password } = req.body;

      const Admin = await AdminModel.findOne({ email });
      if (!Admin)
        return res
          .status(400)
          .json({ errors: [{ message: 'Failed! Invalid login details' }] });
      // compare password
      const isValidPassword = await bcrypt.compare(password, Admin.password);
      if (!isValidPassword)
        return res
          .status(400)
          .json({ errors: [{ message: 'Failed! Incorrect password' }] });

      // Generate customer token
      const token = jwt.sign({ email: Admin.email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      const { name, role } = Admin;

      return res.status(200).json({
        status: 'success',
        data: {
          name,
          email,
          role,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const getAllSchools = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      let { page } = req.query;

      if (!page) {
        parseInt(page) = 1;
      }

      const total = await SchoolModel.find();
      const schools = await SchoolModel.find()
        .sort({ _id: 1 }) 
        .limit(10)
        .skip(page > 1 && page * 10);

      return res.status(200).json({
        message: 'success',
        total: total.length,
        page:parseInt(page),
        perPage: 10,
        data: { schools },
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const getAllParticipants = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const Participants = await ParticipantModel.find();

      return res
        .status(200)
        .json({ message: 'success', data: { Participants } });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  return {
    register,
    login,
    getAllSchools,
    getAllParticipants,
  };
};
