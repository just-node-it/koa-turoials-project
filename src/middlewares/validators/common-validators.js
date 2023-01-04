const Joi = require('joi');

module.exports = {
  idValidator: Joi.number().integer().required(),
};
