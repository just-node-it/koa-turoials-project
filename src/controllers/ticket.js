const ticketService = require('../services/ticket');

module.exports = {
  findTickets: async (ctx) => {
    const tickets = await ticketService.findAll();
    ctx.status = 200;
    ctx.body = tickets;
  },

  findTicket: async (ctx) => {
    const {
      params: { id },
    } = ctx.request;

    const ticket = await ticketService.findOne(id);
    if (!ticket) {
      ctx.status = 404;
    } else {
      ctx.body = ticket;
    }
  },

  createTicket: async (ctx) => {
    const { body } = ctx.request;
    const ticket = await ticketService.create(body);
    ctx.status = 201;
    ctx.body = ticket;
  },

  updateTicket: async (ctx) => {
    const {
      params: { id },
      body,
    } = ctx.request;
    const ticket = await ticketService.update(id, body);
    ctx.body = ticket;
  },
};
