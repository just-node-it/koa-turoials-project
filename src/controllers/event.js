const eventService = require('../services/event');

module.exports = {
  findEvents: async (ctx) => {
    const events = await eventService.findAll();
    ctx.status = 200;
    ctx.body = events;
  },

  findEvent: async (ctx) => {
    const {
      params: { id },
    } = ctx.request;

    const event = await eventService.findOne(id);
    if (!event) {
      ctx.status = 404;
    } else {
      ctx.body = event;
    }
  },

  createEvent: async (ctx) => {
    const { body } = ctx.request;
    const event = await eventService.create(body);
    ctx.status = 201;
    ctx.body = event;
  },

  deleteEvent: async (ctx) => {
    const {
      params: { id },
    } = ctx.request;
    await eventService.delete(id);
    ctx.status = 204;
  },

  updateEvent: async (ctx) => {
    const {
      params: { id },
      body,
    } = ctx.request;
    const event = await eventService.update(id, body);
    ctx.body = event;
  },
};
