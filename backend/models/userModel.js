import mongoose from 'mongoose';
import { type } from 'node:os';

const userSchema = new mongoose.Schema(
  {
    publications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Publication' }],
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'active'
    },
    status: {
      type: String,
      default: 'active'
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

export default User;
