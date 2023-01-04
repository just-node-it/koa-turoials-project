const Joi = require('joi');
const authValidator = require('./auth-validator');
const eventValidator = require('./event-validator');
const classificationValidator = require('./classification-validator');
const employeeValidator = require('./employee-validator');
const expositionValidator = require('./exposition-validator');
const ticketValidator = require('./ticket-validator');
const orderValidator = require('./order-validator');
const animalValidator = require('./animal-validator');
const AppError = require('../../utils/app-error');

const sanitizeBooleanString = (object) => {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (value === 'false') {
      return { ...acc, [key]: false };
    } else if (value === 'true') {
      return { ...acc, [key]: true };
    }
    return { ...acc, [key]: value };
  }, {});
};

module.exports = {
  authValidator,
  eventValidator,
  classificationValidator,
  employeeValidator,
  expositionValidator,
  ticketValidator,
  orderValidator,
  animalValidator,

  idRules: Joi.object({
    params: Joi.object({
      id: Joi.number().integer().required(),
    }).required(),
  }),

  validate: (schema) => async (ctx, next) => {
    const { body, query, params } = ctx.request;
    const partiallySanitizedQuery = sanitizeBooleanString(query);
    const { value, error } = schema.validate(
      { body, query: partiallySanitizedQuery, params },
      { convert: true, stripUnknown: true }, // whitelist
    );

    if (error) {
      // abortEarly option is true by default
      throw AppError.badRequest(error.details[0].message);
    }

    ctx.request.body = value.body;
    ctx.request.params = value.params;
    ctx.request.query = value.query;
    Object.keys(ctx.request.query).forEach(
      (key) => (ctx.request.query[key] = value.query[key]),
    );
    await next();
  },
};
