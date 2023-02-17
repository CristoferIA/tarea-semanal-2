const User = require('../models/users.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.userById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });
  if (!user) {
    next(new AppError('User not fount', 404));
  }
  req.user = user;
  next();
});
