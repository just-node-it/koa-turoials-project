const prisma = require('../config/db');

module.exports = {
  async findAll() {
    return prisma.employee.findMany();
  },

  async findOne(employeeId) {
    return prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });
  },

  async create(employeeData) {
    return prisma.employee.create({
      data: employeeData,
    });
  },

  async update(employeeId, employeeData) {
    return prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: employeeData,
    });
  },

  async delete(employeeId) {
    return prisma.employee.delete({
      where: {
        id: employeeId,
      },
    });
  },
};
