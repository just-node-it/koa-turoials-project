const Joi = require('joi');
const { idValidator } = require('./common-validators');

module.exports = {
  createEmployeeRules: Joi.object({
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
    }).required(),
  }),
  updateEmployeeRules: Joi.object({
    body: Joi.object({
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      email: Joi.string().email().optional(),
    }).required(),
    params: Joi.object({
      id: idValidator,
    }).required(),
  }),
};
