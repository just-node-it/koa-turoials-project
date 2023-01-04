const Joi = require('joi');
const { idValidator } = require('./common-validators');

module.exports = {
  createEventRules: Joi.object({
    body: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      startAt: Joi.date().required().iso(),
      endAt: Joi.date().required().iso(),
      maxVisitorsNumber: Joi.number().integer().min(0).required(),
      registeredVisitorsNumber: Joi.number().integer().min(0).required(),
    },
  })
    .required()
    .custom((value, helper) => {
      if (value.registeredVisitorsNumber > value.maxVisitorsNumber) {
        return helper.message(
          'registeredVisitorsNumber can not be bigger than maxVisitorsNumber',
        );
      }
      return value;
    }),
  updateEventRules: Joi.object({
    body: {
      name: Joi.string().optional(),
      description: Joi.string().optional(),
      startAt: Joi.date().optional().iso(),
      endAt: Joi.date().optional().iso(),
      maxVisitorsNumber: Joi.number().integer().min(0).optional(),
      registeredVisitorsNumber: Joi.number().integer().min(0).optional(),
    },
    params: Joi.object({
      id: idValidator,
    }).required(),
  }),
};
