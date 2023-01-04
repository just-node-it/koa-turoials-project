const prisma = require('../config/db');
const AppError = require('../utils/app-error');

module.exports = {
  async findAll() {
    return prisma.event.findMany();
  },

  async findOne(eventId) {
    return prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });
  },

  async create(eventData) {
    return prisma.event.create({
      data: eventData,
    });
  },

  async update(eventId, eventData) {
    const { registeredVisitorsNumber } = eventData;
    if (registeredVisitorsNumber || registeredVisitorsNumber === 0) {
      const event = await prisma.event.findUnique({ where: { id: eventId } });
      if (!event) {
        throw AppError.badRequest('Resource was not found');
      } else if (registeredVisitorsNumber > event.maxVisitorsNumber) {
        throw AppError.badRequest(
          'registeredVisitorsNumber can not be bigger than maxVisitorsNumber',
        );
      }
    }

    return prisma.event.update({
      where: {
        id: eventId,
      },
      data: eventData,
    });
  },

  async delete(eventId) {
    return prisma.event.delete({
      where: {
        id: eventId,
      },
    });
  },
};
