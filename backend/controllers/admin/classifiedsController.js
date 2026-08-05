import asyncHandler from '../../middleware/asyncHandler.js';
import Product from '../../models/admin/productModel.js';

// @desc Fetch All Products
// @route GET /api/admin/classifieds
// @access Private

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate('publications', 'name');
  res.status(200).json(products);
});

// @desc Create product
// @route POST /api/admin/classifieds
// @access Private

const createProduct = asyncHandler(async (req, res) => {
  const { name, inStock, price, publications } = req.body;

  const product = new Product({
    user: req.user._id,
    name,
    inStock,
    price,
    publications
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

export { getProducts, createProduct };
