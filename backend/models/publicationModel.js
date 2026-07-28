import mongoose from 'mongoose';

const publicationNoteSchema = new mongoose.Schema(
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

const publicationSchema = new mongoose.Schema(
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

    address: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipcode: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: 'active'
    },
    parentPublication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publication',
      default: null
    },

    notes: [publicationNoteSchema]
  },
  {
    timestamps: true
  }
);

const Publication = mongoose.model('Publication', publicationSchema);

export default Publication;
