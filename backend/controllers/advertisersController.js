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
  const advertiser = await Advertiser.findById(req.params.id).populate('user', 'firstname lastname');

  if (advertiser) {
    return res.json(advertiser);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
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

// @desc Update Advertiser
// @route PUT /api/:id
// @access Private

const updateAdvertiser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phone, businessname, accountType, address, city, state, zipcode, billingEmail, contact, status } = req.body;

  const advertiser = await Advertiser.findById(req.params.id);

  if (advertiser) {
    ((advertiser.firstname = firstname), (advertiser.lastname = lastname), (advertiser.email = email), (advertiser.phone = phone), (advertiser.businessname = businessname), (advertiser.accountType = accountType), (advertiser.address = address), (advertiser.city = city), (advertiser.state = state), (advertiser.zipcode = zipcode), (advertiser.billingEmail = billingEmail), (advertiser.contact = contact), (advertiser.status = status));

    const updateAdvertiser = await advertiser.save();
    res.json(updateAdvertiser);
  }
});

// @desc Delete advertiser
// @route DELETE /api/:id
// @access Private

const deleteAdvertiser = asyncHandler(async (req, res) => {
  const advertiser = await Advertiser.findById(req.params.id);

  if (advertiser) {
    await advertiser.deleteOne({ _id: advertiser._id });
    res.status(200).json({ message: 'Advertiser removed.' });
  } else {
    throw new Error('Resource not found');
  }
});

export { getAdvertisers, getSingleAdvertiser, createAdvertiser, updateAdvertiser, deleteAdvertiser };
