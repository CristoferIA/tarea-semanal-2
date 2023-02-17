const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controllers');
const { userById } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findAllUsers);

router.get('/:id', userById, findOneUser);

router.post(
  '/',
  [
    check('name', 'The username must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.patch(
  '/:id',
  [
    check('name', 'The username must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').not().isEmail(),
    validateFields,
    userById,
  ],
  updateUser
);

router.delete('/:id', userById, deleteUser);

module.exports = {
  userRouter: router,
};
