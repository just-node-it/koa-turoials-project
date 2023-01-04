const Joi = require('joi');
const { idValidator } = require('./common-validators');

const orderStates = ['NEW', 'PROCESSED', 'FINISHED', 'REJECTED'];

module.exports = {
  createOrderRules: Joi.object({
    body: Joi.object({
      orderItems: Joi.array()
        .items(
          Joi.object({
            ticketId: Joi.number().integer().required(),
            amount: Joi.number().integer().required(),
          }),
        )
        .required(),
      customerName: Joi.string().required(),
      customerSurname: Joi.string().required(),
      customerEmail: Joi.string().email().required(),
      reservationDay: Joi.date().iso().required(),
    }).required(),
  }),

  updateOrderState: Joi.object({
    body: Joi.object({
      state: Joi.string()
        .valid(...orderStates)
        .optional(),
    }).required(),
    params: Joi.object({
      id: idValidator,
    }).required(),
  }),
};
