const employeeService = require('../services/employee');
// const baseService = new (require('../services/base'))('employee');

module.exports = {
  findEmployees: async (ctx) => {
    const employees = await employeeService.findAll();
    ctx.status = 200;
    ctx.body = employees;
  },

  findEmployee: async (ctx) => {
    const {
      params: { id },
    } = ctx.request;

    const employee = await employeeService.findOne(id);
    if (!employee) {
      ctx.status = 404;
    } else {
      ctx.body = employee;
    }
  },

  createEmployee: async (ctx) => {
    const { body } = ctx.request;
    const employee = await employeeService.create(body);
    ctx.status = 201;
    ctx.body = employee;
  },

  deleteEmployee: async (ctx) => {
    const {
      params: { id },
    } = ctx.request;
    await employeeService.delete(id);
    ctx.status = 204;
  },

  updateEmployee: async (ctx) => {
    const {
      params: { id },
      body,
    } = ctx.request;
    const employee = await employeeService.update(id, body);
    ctx.body = employee;
  },
};
