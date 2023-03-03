const Repair = require('../models/repairs.models');
const catchAsync = require('../utils/catchAsync');

exports.findAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    attributes: ['id', 'date', 'userId'],
    where: {
      status: 'pending',
    },
  });
  return res.status(200).json({
    status: 'success',
    repairs,
  });
});

exports.findOneRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  return res.status(200).json({
    status: 'success',
    repair,
  });
});
exports.createRepair = catchAsync(async (req, res) => {
  const { date, motorsNumber, description, userId } = req.body;
  const repair = await Repair.create({
    date,
    motorsNumber,
    description,
    userId,
  });
  return res.status(201).json({
    status: 'success',
    message: 'Created Repair',
    repair,
  });
});
exports.updateRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  await repair.update({ status: 'completed' });

  return res.status(200).json({
    status: 'success',
  });
});

exports.deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  await repair.update({ status: 'cancelled' });
  return res.status(200).json({
    status: 'success',
  });
});
