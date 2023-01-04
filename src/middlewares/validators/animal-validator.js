const Joi = require('joi');
const { idValidator } = require('./common-validators');

const sortOptions = ['asc', 'desc'];
const isTrueValue = (value) => value === 'true';

module.exports = {
  createAnimalRules: Joi.object({
    body: Joi.object({
      name: Joi.string().required(),
      age: Joi.number().integer().min(0).optional(),
      sex: Joi.string().optional(),
      latinName: Joi.string().optional(),
      habitat: Joi.string().optional(),
      description: Joi.string().optional(),
      menu: Joi.string().optional(),
      dateArrived: Joi.date().iso().required(),
      photo: Joi.string().optional(),
      classificationId: Joi.number().integer().optional(),
      employeeId: Joi.number().integer().optional(),
      parents: Joi.array().items(Joi.number().integer().optional()),
      children: Joi.array().items(Joi.number().integer().optional()),
    }).required(),
  }),

  updateAnimalRules: Joi.object({
    body: Joi.object({
      name: Joi.string().optional(),
      age: Joi.number().integer().min(0).optional(),
      sex: Joi.string().optional(),
      latinName: Joi.string().optional(),
      habitat: Joi.string().optional(),
      description: Joi.string().optional(),
      menu: Joi.string().optional(),
      dateArrived: Joi.date().iso().optional(),
      photo: Joi.string().optional(),
      classificationId: Joi.number().integer().optional(),
      employeeId: Joi.number().integer().optional(),
    }).required(),
    params: Joi.object({
      id: idValidator,
    }).required(),
  }),

  addRemoveChildRules: Joi.object({
    params: Joi.object({
      id: idValidator,
      childId: idValidator,
    }),
  }),

  addRemoveParentRules: Joi.object({
    params: Joi.object({
      id: idValidator,
      parentId: idValidator,
    }),
  }),

  findAnimalRules: Joi.object({
    query: Joi.object({
      classificationTree: Joi.boolean().optional(),
      parentsIncluded: Joi.boolean().optional(),
      childrenIncluded: Joi.boolean().optional(),
    }).optional(),
    params: Joi.object({
      id: idValidator,
    }).required(),
  }),

  findAnimalsRules: Joi.object({
    query: Joi.object({
      sort: Joi.string()
        .valid(...sortOptions)
        .optional(),
      age: Joi.object({
        lte: Joi.number().integer().optional(),
        gte: Joi.number().integer().optional(),
        lt: Joi.number().integer().optional(),
        gt: Joi.number().integer().optional(),
        equals: Joi.number().integer().optional(),
        not: Joi.number().integer().optional(),
      }).optional(),
      parentId: Joi.number().integer().optional(),
      classificationId: Joi.number().integer().optional(),
      photo: Joi.boolean().optional(),
      parentsIncluded: Joi.boolean().optional(),
      childrenIncluded: Joi.boolean().optional(),
    }).optional(),
  }),
};
