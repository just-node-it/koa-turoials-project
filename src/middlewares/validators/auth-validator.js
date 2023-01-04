const Joi = require('joi');

module.exports = {
  loginRules: Joi.object({
    body: Joi.object({
      email: Joi.string().email().optional(),
      username: Joi.string().min(4).optional(),
      password: Joi.string().min(8).required(),
    })
      .required()
      .custom((value, helper) => {
        if (!value.email && !value.username) {
          return helper.message(
            'E-mail or username should be used for the login operation',
          );
        }
        return value;
      }),
  }),

  registerRules: Joi.object({
    body: Joi.object({
      email: Joi.string().email().required(),
      username: Joi.string().min(4).required(),
      password: Joi.string().min(8).required(),
    }).required(),
  }),
};
