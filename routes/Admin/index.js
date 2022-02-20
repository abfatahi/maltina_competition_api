import express from 'express';
import { body, header, param } from 'express-validator';
import Controller from '../../controllers/Admin/index.js';
import { AdminMiddleware } from '../../middlewares/index.js';

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

router.get(
  '/schools',
  [
    header(
      'Authorization',
      'Unauthorized! Sign in to your account for authorization'
    )
      .exists()
      .bail()
      .custom((value) => AdminMiddleware.isValidAdminToken(value)),
  ],
  AdminController.getAllSchools
);

router.get(
  '/participants',
  [
    header(
      'Authorization',
      'Unauthorized! Sign in to your account for authorization'
    )
      .exists()
      .bail()
      .custom((value) => AdminMiddleware.isValidAdminToken(value)),
  ],
  AdminController.getAllParticipants
);

router.get(
  '/schools/:schoolId',
  [
    header(
      'Authorization',
      'Unauthorized! Sign in to your account for authorization'
    )
      .exists()
      .bail()
      .custom((value) => AdminMiddleware.isValidAdminToken(value)),
    param('schoolId', 'schoolId! Email cant be blank').exists().bail(),
  ],
  AdminController.getSchool
);

export default router;
