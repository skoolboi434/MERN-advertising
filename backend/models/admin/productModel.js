import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    publications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Publication' }],
    name: {
      type: String,
      required: true
    },
    inStock: {
      type: Boolean,
      default: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
