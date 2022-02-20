import express from 'express';
import { body } from 'express-validator';
import { SchoolMiddleware } from '../../middlewares/index.js';
import Controller from '../../controllers/School/index.js';

const SchoolController = Controller();

const router = express.Router();

router.post(
  '/register',
  [
    body('name', 'Failed! School name field cannot be blank')
      .exists()
      .bail()
      .isString()
      .withMessage('Failed! School name must be a string')
      .trim()
      .custom((name) => SchoolMiddleware.isUniqueName(name)),
    body('address', 'Failed! School address field cannot be blank')
      .exists()
      .bail()
      .trim(),
    body('email', 'Failed! Email cant be blank')
      .exists()
      .isEmail()
      .withMessage('Invalid Email format')
      .custom((email) => SchoolMiddleware.isUniqueEmail(email)),
    body('phoneNumber', 'Failed! Phone number cant be blank')
      .exists()
      .trim()
      .isLength({ min: 8, max: 15 })
      .withMessage('Fullname should have 4 to 20 characters')
      .custom((phoneNumber) =>
        SchoolMiddleware.isUniquePhoneNumber(phoneNumber)
      ),
    body('facebookId', 'Failed! School Facebook Id field cannot be blank')
      .exists()
      .bail()
      .trim(),
    body('motto', 'Failed! School motto field cannot be blank')
      .exists()
      .bail()
      .trim(),
    body('yearFounded', 'Failed! School founding year field cannot be blank')
      .exists()
      .bail()
      .trim(),
    body('gameMaster', 'Failed! School game master field cannot be blank')
      .exists()
      .bail()
      .trim(),
  ],
  SchoolController.register
);

export default router;
