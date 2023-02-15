/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const { badRequestError, serverError } = require('../custome_error/handler/errorHandler');
const userModel = require('../models/user');

exports.CheckRedudantUser = async (req, res, next) => {
  await userModel.verifyUser(req.body.user)
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        return badRequestError('Gagal menambahkan user. Email atau Username sudah digunakan.', res);
      }
      return next();
    })
    .catch((err) => {
      if (!err.statusCode) {
        serverError('Terjadi kesalahan pada server kami', err.statusCode = 500, res);
      }
      console.log(err.message);
    });
};
