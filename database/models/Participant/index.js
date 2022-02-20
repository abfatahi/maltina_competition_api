import mongoose from 'mongoose';

const ParticipantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    schoolId: {
      type: String,
      trim: true,
    },
    events: {
      type: Array,
      default: [],
    },
    participantClass: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const ParticipantModel = mongoose.model('ParticipantModel', ParticipantSchema);

export default ParticipantModel;
