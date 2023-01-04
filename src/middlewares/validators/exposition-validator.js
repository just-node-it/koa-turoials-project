const Joi = require('joi');
const { idValidator } = require('./common-validators');

module.exports = {
  createExpositionRules: Joi.object({
    body: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().optional(),
    }).required(),
  }),
  updateExpositionRules: Joi.object({
    body: Joi.object({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
    }).required(),
    params: Joi.object({
      id: idValidator,
    }).required(),
  }),
};
