import mongoose from 'mongoose';

const ParticipantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    events: {
      type: Array,
      default: [],
    },
    class: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    facebookId: {
      type: String,
      trim: true,
    },
    motto: {
      type: String,
      trim: true,
    },
    yearFounded: {
      type: String,
      trim: true,
    },
    teamName: {
      type: String,
      trim: true,
    },
    gameMaster: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const ParticipantModel = mongoose.model('ParticipantModel', ParticipantSchema);

export default ParticipantModel;
