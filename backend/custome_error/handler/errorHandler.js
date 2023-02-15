/* eslint-disable no-empty */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const BadRequestError = require('../badRequestError');
const ClientError = require('../ClientError');
const NotFoundError = require('../notFoundError');
const ServerError = require('../serverError');

const badRequestError = (msg, res) => {
  try {
    throw new BadRequestError(msg);
  } catch (error) {
    if (error instanceof ClientError) {
      return res.status(error.statusCode).send({
        status: 'fail',
        message: error.message,
      });
    }
  }
};

const notFoundRequestError = (msg, res) => {
  try {
    throw new NotFoundError(msg);
  } catch (error) {
    if (error instanceof ClientError) {
      return res.status(error.statusCode).send({
        status: 'fail',
        message: error.message,
      });
    }
  }
};

const serverError = (msg, statusCode, res) => {
  try {
    throw new ServerError(msg, statusCode);
  } catch (error) {
    if (error instanceof ClientError) {
      return res.status(error.statusCode).send({
        status: 'fail',
        message: error.message,
      });
    }
  }
};

module.exports = {
  badRequestError,
  notFoundRequestError,
  serverError,
};
