import asyncHandler from '../../middleware/asyncHandler.js';
import User from '../../models/userModel.js';
import AccountType from '../../models/admin/accountTypeModel.js';
import UserRole from '../../models/admin/userRolesModel.js';

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

// @desc Update Account type
// @route PUT /api/admin/accounts/:id
// @access Private

const updateAccountType = asyncHandler(async (req, res) => {
  const { name, code, status } = req.body;

  const accountType = await AccountType.findById(req.params.id);

  if (accountType) {
    ((accountType.name = name), (accountType.code = code), (accountType.status = status));

    const updateAccountType = await accountType.save();
    res.json(updateAccountType);
  }
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

// End Account Type Controllers

// User Roles Controllers

// @desc Fetch All User Roles
// @route GET /api/admin/accounts
// @access Private

const getUserRoles = asyncHandler(async (req, res) => {
  const userRoles = await UserRole.find({});
  res.status(200).json(userRoles);
});

// @desc Create user role
// @route POST /api/admin/accounts
// @access Private

const createUserRole = asyncHandler(async (req, res) => {
  const { code, name } = req.body;

  const userRole = new UserRole({
    user: req.user._id,
    code,
    name
  });

  const createdUserRole = await userRole.save();
  res.status(201).json(createdUserRole);
});

export { getAccountTypes, createAccountType, importAccountTypes, deleteAccountType, updateAccountType, getUserRoles, createUserRole };
