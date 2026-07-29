import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { type } from 'node:os';

const userSchema = new mongoose.Schema(
  {
    publications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Publication' }],
    firstname: {
      type: String
    },
    lastname: {
      type: String
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
      unique: true
    },
    phone: {
      type: String
    },
    role: {
      type: String,
      default: 'staff'
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

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
