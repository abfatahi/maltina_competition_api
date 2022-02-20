import express from 'express';
import { body } from 'express-validator';
import { SharedMiddleware } from '../../middlewares/index.js';
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
      .trim(),
    body('address', 'Failed! School address field cannot be blank')
      .exists()
      .bail()
      .trim(),
    body('email', 'Failed! Email cant be blank')
      .exists()
      .isEmail()
      .withMessage('Invalid Email format')
      .custom((email) => SharedMiddleware.isUniqueEmail(email)),
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
