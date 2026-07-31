import asyncHandler from '../../middleware/asyncHandler.js';
import User from '../../models/userModel.js';
import AccountType from '../../models/admin/accountTypeModel.js';

// @desc Fetch All Account types
// @route GET /api/admin/accounts
// @access Private

const getAccountTypes = asyncHandler(async (req, res) => {
  const accountTypes = await AccountType.find({});
  res.status(200).json(accountTypes);
});

// @desc Create an account type
// @route POST /api/admin/accounts
// @access Private

const createAccountType = asyncHandler(async (req, res) => {
  const { code, name } = req.body;

  const accountType = new AccountType({
    user: req.user._id,
    code,
    name
  });

  const createdAccountType = await accountType.save();
  res.status(201).json(createdAccountType);
});

export { getAccountTypes, createAccountType };
