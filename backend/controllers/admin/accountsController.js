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

// @desc Import Account types from JSON
// @route GET /api/admin/accounts/import
// @access Private

const importAccountTypes = asyncHandler(async (req, res) => {
  const records = req.body.map(r => ({ ...r, user: req.user._id }));
  const result = await AccountType.insertMany(records, { ordered: false });
  res.status(201).json(result);
});

// @desc Delete account type
// @route DELETE /api/:id
// @access Private

const deleteAccountType = asyncHandler(async (req, res) => {
  const accountType = await AccountType.findById(req.params.id);

  if (accountType) {
    await AccountType.deleteOne({ _id: accountType._id });
    res.status(200).json({ message: 'Account Type removed.' });
  } else {
    throw new Error('Resource not found');
  }
});

export { getAccountTypes, createAccountType, importAccountTypes, deleteAccountType };
