const Joi = require('joi');
const { idValidator } = require('./common-validators');

const animalClassificationTypes = [
  'KINGDOM',
  'PHYLUM',
  'CLASS',
  'ORDER',
  'FAMILY',
  'GENUS',
  'SPECIES',
];

module.exports = {
  createClassificationRules: Joi.object({
    body: Joi.object({
      type: Joi.string()
        .required()
        .valid(...animalClassificationTypes),
      name: Joi.string().required(),
      parentCategoryId: Joi.number().integer().optional(),
    }).required(),
  }),
  updateClassificationRules: Joi.object({
    body: Joi.object({
      type: Joi.string()
        .valid(...animalClassificationTypes)
        .optional(),
      name: Joi.string().optional(),
      parentCategoryId: Joi.number().integer().optional(),
    }).required(),
    params: Joi.object({
      id: idValidator,
    }).required(),
  }),
};
