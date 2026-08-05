import asyncHandler from '../../middleware/asyncHandler.js';
import Product from '../../models/admin/productModel.js';

// @desc Fetch All Products
// @route GET /api/admin/classifieds
// @access Private

const getProducts = asyncHandler(async (req, res) => {
  res.send('Products Page');
});

export { getProducts };
