import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: 'subAdmin',
    },
  },
  { timestamps: true }
);

const AdminModel = mongoose.model('AdminModel', AdminSchema);

export default AdminModel;
