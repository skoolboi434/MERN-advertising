import mongoose from 'mongoose';

const accountTypeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    code: {
      type: String,
      required: true
    },
    name: {
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

const AccountType = mongoose.model('AccountType', accountTypeSchema);

export default AccountType;
