/* eslint-disable consistent-return */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
const Joi = require('@hapi/joi');

// const BadRequestError = require('../../custome_error/badRequestError');
const { badRequestError } = require('../../custome_error/handler/errorHandler');

exports.addUserValidator = (req, res, next) => {
  const schemaUser = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    userName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().required(),
  });

  const resultValidator = schemaUser.validate(req.body);

  if (resultValidator.error) {
    return badRequestError(resultValidator.error.message, res);
  }

  req.body.user = resultValidator.value;
  next();
};

exports.loginUserValidator = (req, res, next) => {
  const schemaUser = Joi.object({
    userName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().required(),
  });

  const resultValidator = schemaUser.validate(req.body);

  if (resultValidator.error) {
    return badRequestError(resultValidator.error.message, res);
  }

  req.body.user = resultValidator.value;
  next();
};
