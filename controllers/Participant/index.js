import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { ParticipantModel, SchoolModel } from '../../database/models/index.js';

export default () => {
  const register = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const tokenData = jwt.verify(req.params.token, process.env.JWT_SECRET);
      if (tokenData.exp < new Date().getTime() / 1000)
        return res.status(400).json({ message: 'Link expired' });

      const School = await SchoolModel.findOne({ email: tokenData.email });

      const { participants } = req.body;

      participants.forEach((participant) => {
        const { name, events, participantClass, dateOfBirth } = participant;
        const newParticipant = new ParticipantModel({
          name,
          schoolId: School.schoolId,
          events,
          participantClass,
          dateOfBirth,
        });
        newParticipant.save();
      });

      const Participants = await ParticipantModel.find({
        school: School.schoolId,
      });

      return res.status(200).json({
        status: 'success',
        data: {
          Participants,
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
