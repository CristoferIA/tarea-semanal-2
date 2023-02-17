const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllRepairs,
  findOneRepair,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repair.controller');
const { repairsById } = require('../middlewares/repairs.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findAllRepairs);

router.get('/:id', repairsById, findOneRepair);

router.post(
  '/',
  [
    check('date', 'The date is required').not().isEmpty(),
    check('motorsNumber', 'The motorsNumber is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    validateFields,
  ],
  createRepair
);

router.patch(
  '/:id',
  [
    check('date', 'The date is required').not().isEmpty(),
    check('motorsNumber', 'The motorsNumber is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    validateFields,
    repairsById,
  ],
  updateRepair
);

router.delete('/:id', repairsById, deleteRepair);

module.exports = {
  repairRouter: router,
};
