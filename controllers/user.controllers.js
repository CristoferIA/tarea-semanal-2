const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/AppError');

exports.findAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email'],
    where: {
      status: 'available',
    },
  });
  return res.status(200).json({
    status: 'success',
    message: 'Users found',
    users,
  });
});

exports.findOneUser = catchAsync(async (req, res) => {
  const { user } = req;
  return res.status(200).json({
    status: 'success',
    message: 'User Found',
    user,
  });
});
exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();

  const token = await generateJWT(user.id);

  return res.status(201).json({
    status: 'success',
    message: 'User created',
    token,
    user,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const { user } = req;
  const { name, email } = req.body;
  await user.update({ name, email });
  return res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});
exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;
  await user.update({ status: 'disabled' });
  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'available',
    },
  });
  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user,
  });
});
