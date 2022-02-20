import mongoose from 'mongoose';

const SchoolSchema = new mongoose.Schema(
  {
    schoolId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
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
    inviteToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const SchoolModel = mongoose.model('SchoolModel', SchoolSchema);

export default SchoolModel;
