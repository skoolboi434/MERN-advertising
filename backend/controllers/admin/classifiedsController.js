import asyncHandler from '../../middleware/asyncHandler.js';
import Product from '../../models/admin/productModel.js';
import Category from '../../models/admin/categoryModel.js';

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

// Categories

// @desc Fetch All Categories
// @route GET /api/admin/classifieds
// @access Private

const getCategories = asyncHandler(async (req, res) => {
  //const categories = await Category.find({}).populate('categories', 'name');
  const categories = await Category.find({});
  res.status(200).json(categories);
});

// @desc Create category
// @route POST /api/admin/classifieds
// @access Private

const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, products, parentCategory } = req.body;

  const category = new Category({
    user: req.user._id,
    name,
    slug,
    products,
    parentCategory
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

export { getProducts, createProduct, getCategories, createCategory };
