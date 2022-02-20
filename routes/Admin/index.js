import express from 'express';
import { body } from 'express-validator';
import Controller from '../../controllers/Admin/index.js';

const AdminController = Controller();

const router = express.Router();

router.post('/register', AdminController.register);

router.post(
  '/login',
  [
    body('email', 'Failed! Email cant be blank')
      .exists()
      .bail()
      .isEmail()
      .withMessage('Invalid Email format'),
    body('password', 'Failed! Password cant be blank')
      .exists()
      .bail()
      .trim()
      .not()
      .isEmpty()
      .withMessage('Password cant be empty'),
  ],
  AdminController.login
);

export default router;
