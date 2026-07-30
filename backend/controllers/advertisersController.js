import asyncHandler from '../middleware/asyncHandler.js';
import Advertiser from '../models/advertiserModel.js';
import User from '../models/userModel.js';

// @desc Fetch All Advertisers
// @route GET /api/advertisers
// @access Private

const getAdvertisers = asyncHandler(async (req, res) => {
  const advertisers = await Advertiser.find({}).populate('user', 'firstname lastname');
  res.json(advertisers);
});

// @desc Fetch Single Advertiser
// @route GET /api/:id
// @access Private

const getSingleAdvertiser = asyncHandler(async (req, res) => {
  res.send('Single Advertiser');
});

// @desc Create an advertiser
// @route POST /api/advertisers
// @access Private

const createAdvertiser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phone, businessname, accountType, address, city, state, zipcode, billingEmail, contact } = req.body;

  const advertiser = new Advertiser({
    user: req.user._id,
    firstname,
    lastname,
    email,
    phone,
    businessname,
    accountType,
    address,
    city,
    state,
    zipcode,
    billingEmail,
    contact
  });

  const createdAdvertiser = await advertiser.save();
  res.status(201).json(createdAdvertiser);
});

export { getAdvertisers, getSingleAdvertiser, createAdvertiser };
