import mongoose from 'mongoose';

const userRoleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

const UserRole = mongoose.model('UserRole', userRoleSchema);

export default UserRole;
