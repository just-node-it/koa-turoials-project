class BaseService {
  constructor(model) {
    this.model = model;
    this.prisma = require('../config/db');
  }

  async findAll() {
    return this.prisma[this.model].findMany();
  }

  async findOne(id) {
    return this.prisma[this.model].findUnique({
      where: {
        id,
      },
    });
  }

  async create(data) {
    return this.prisma[this.model].create({
      data: data,
    });
  }

  async update(id, data) {
    return this.prisma[this.model].update({
      where: {
        id,
      },
      data: data,
    });
  }

  async delete(id) {
    return this.prisma[this.model].delete({
      where: {
        id,
      },
    });
  }
}

module.exports = BaseService;
