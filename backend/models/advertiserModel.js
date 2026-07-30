import mongoose from 'mongoose';

const advertiserNoteSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    noteType: {
      type: String,
      required: true
    },
    content: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const advertiserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },

    firstname: {
      type: String,
      required: true
    },
    lastname: {
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
    businessname: {
      type: String,
      required: true
    },
    accountType: {
      type: String
    },
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipcode: {
      type: Number
    },
    billingEmail: {
      type: String,
      required: true
    },
    contact: {
      type: String
    },
    status: {
      type: String,
      default: 'active'
    },

    notes: [advertiserNoteSchema]
  },
  {
    timestamps: true
  }
);

const Advertiser = mongoose.model('Advertiser', advertiserSchema);

export default Advertiser;
