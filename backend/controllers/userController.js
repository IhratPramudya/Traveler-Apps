/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unreachable-loop */
/* eslint-disable consistent-return */
const bcrypte = require('bcryptjs');
const { serverError } = require('../custome_error/handler/errorHandler');
const userModel = require('../models/user');

/* eslint-disable new-cap */

/* eslint-disable no-unused-vars */
exports.addUser = async (req, res, next) => {
  const salt = await bcrypte.genSalt(10);
  const hashPass = bcrypte.hashSync(req.body.user.password, salt);
  userModel.createUser(req.body.user, hashPass)
    .then((dataAdd) => {
      if (dataAdd.affectedRows === 1) {
        return res.status(201).send({
          status: 'success',
          message: 'User berhasil ditambahkan',
          data: {
            userId: dataAdd,
          },
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        serverError('Terjadi kesalahan pada server kami', err.statusCode = 500, res);
      }
      console.log(err.message);
    });
};

exports.loginUser = (req, res, next) => {
  console.log(req.body.user);
};

exports.getUser = async (req, res, next) => {
  const { userId } = req.params;
  await userModel.getUserById({ userId })
    .then((data) => {
      if (data.length > 0) {
        return res.status(200).send({
          status: 'success',
          message: 'User berhasil ditemukan',
          data: {
            user: { ...data[0] },
          },
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        serverError('Terjadi kesalahan pada server kami', err.statusCode = 500, res);
      }
      console.log(err.message);
    });
};
