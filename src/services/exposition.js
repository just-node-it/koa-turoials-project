const prisma = require('../config/db');

module.exports = {
  async findAll() {
    return prisma.exposition.findMany();
  },

  async findOne(expositionId) {
    return prisma.exposition.findUnique({
      where: {
        id: expositionId,
      },
    });
  },

  async create(expositionData) {
    return prisma.exposition.create({
      data: expositionData,
    });
  },

  async update(expositionId, expositionData) {
    return prisma.exposition.update({
      where: {
        id: expositionId,
      },
      data: expositionData,
    });
  },

  async delete(expositionId) {
    return prisma.exposition.delete({
      where: {
        id: expositionId,
      },
    });
  },
};
