import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status.json({
      _id: user._id,
      username: user.username,
      email: user.email
    });
  } else {
    res.status(401);

    throw new Error('Invalid credentials');
  }
});

// @desc Register user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, email, password, phone } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstname,
    lastname,
    username,
    email,
    password,
    phone
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Logout user & clear cookie
// @route POST /api/users/logout
// @access Private

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.role = req.body.role || user.role;
    user.status = req.body.status || user.status;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updateUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      status: updatedUser.status
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Get all users
// @route GET /api/users/
// @access Private

const getUsers = asyncHandler(async (req, res) => {
  res.send('All users');
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private

const getUserById = asyncHandler(async (req, res) => {
  res.send('Get user by Id');
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private

const updateUser = asyncHandler(async (req, res) => {
  res.send('Update user');
});

// @desc Delete users
// @route DELETE /api/users/:id
// @access Private

const deleteUser = asyncHandler(async (req, res) => {
  res.send('Delete user');
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUser, getUsers, deleteUser, getUserById, updateUserProfile };
