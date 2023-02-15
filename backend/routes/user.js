const express = require('express');

const router = express.Router();
// this is router USER
const userValidator = require('../middleware/validatorSchema/userValidator');
const userMiddleware = require('../middleware/userMiddleware');
const userController = require('../controllers/userController');

// registrasi user di sini
router.post(
  '/signup',
  userValidator.addUserValidator,
  userMiddleware.CheckRedudantUser,
  userController.addUser,
);

// mendapatkan user dengan id user
router.get(
  '/:userId',
  userController.getUser,
);

// ini untuk login user ya
router.post(
  '/login',
  userValidator.loginUserValidator,
  userController.loginUser,
);
module.exports = router;
