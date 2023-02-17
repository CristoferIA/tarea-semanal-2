const Repair = require('../models/repairs.models');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.repairsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repairs = await Repair({
    where: {
      id,
      status: 'pending',
    },
  });
  if (!repairs) {
    next(new AppError('Repairs not fount', 404));
  }
  req.repair = repairs;
  next();
});
