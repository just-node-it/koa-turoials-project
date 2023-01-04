const prisma = require('../config/db');

module.exports = {
  async findAll() {
    return prisma.ticket.findMany();
  },

  async findOne(ticketId) {
    return prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });
  },

  async create(ticketData) {
    return prisma.ticket.create({
      data: ticketData,
    });
  },

  async update(ticketId, ticketData) {
    return prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: ticketData,
    });
  },
};
