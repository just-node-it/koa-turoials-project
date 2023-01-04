const expositionService = require('../services/exposition');

module.exports = {
  findExpositions: async (ctx) => {
    const expositions = await expositionService.findAll();
    ctx.status = 200;
    ctx.body = expositions;
  },

  findExposition: async (ctx) => {
    const {
      params: { id },
    } = ctx.request;

    const exposition = await expositionService.findOne(id);
    if (!exposition) {
      ctx.status = 404;
    } else {
      ctx.body = exposition;
    }
  },

  createExposition: async (ctx) => {
    const { body } = ctx.request;
    const exposition = await expositionService.create(body);
    ctx.status = 201;
    ctx.body = exposition;
  },

  deleteExposition: async (ctx) => {
    const {
      params: { id },
    } = ctx.request;
    await expositionService.delete(id);
    ctx.status = 204;
  },

  updateExposition: async (ctx) => {
    const {
      params: { id },
      body,
    } = ctx.request;
    const exposition = await expositionService.update(id, body);
    ctx.body = exposition;
  },
};
