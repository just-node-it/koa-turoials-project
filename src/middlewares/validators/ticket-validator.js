const Joi = require('joi');
const { idValidator } = require('./common-validators');

module.exports = {
  createTicketRules: Joi.object({
    body: Joi.object({
      name: Joi.string().required(),
      price: Joi.number().integer().required(),
      description: Joi.string().optional(),
    }).required(),
  }),
  updateTicketRules: Joi.object({
    body: Joi.object({
      name: Joi.string().optional(),
      price: Joi.number().integer().optional(),
      description: Joi.string().optional(),
    }).required(),
    params: Joi.object({
      id: idValidator,
    }).required(),
  }),
};
