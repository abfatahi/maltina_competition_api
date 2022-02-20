import express from 'express';
import { body } from 'express-validator';
import Controller from '../../controllers/Participant/index.js';
// import { SchoolMiddleware } from '../../middlewares/index.js';

const ParticipantController = Controller();

const router = express.Router();

router.post(
  '/register/:token',
  [
    body('participants', 'Failed! Participants cannot be blank')
      .exists()
      .bail()
      .isArray()
      .withMessage(
        'Failed! Participant must be an array with atleast one participant'
      ),
  ],
  ParticipantController.register
);

export default router;
