const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllRepairs,
  findOneRepair,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repair.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const { repairsById } = require('../middlewares/repairs.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.use(protect);

router.get('/', restrictTo('employee'), findAllRepairs);

router.get('/:id', restrictTo('employee'), repairsById, findOneRepair);

router.post(
  '/',
  [
    check('date', 'The date is required').not().isEmpty(),
    check('motorsNumber', 'The motorsNumber is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('userId', 'The userId is required').not().isEmpty(),
    validateFields,
  ],
  createRepair
);

router.patch('/:id', restrictTo('employee'), repairsById, updateRepair);

router.delete('/:id', restrictTo('employee'), repairsById, deleteRepair);

module.exports = {
  repairRouter: router,
};
