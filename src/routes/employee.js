const {
  validators: { validate, employeeValidator, idRules },
  jwtAuth,
} = require('../middlewares');

const KoaRouter = require('koa-router');
const router = new KoaRouter();

const { createEmployeeRules, updateEmployeeRules } = employeeValidator;
const {
  findEmployees,
  findEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} = require('../controllers/employee');

router
  .prefix('/employees')
  .get('/', findEmployees)
  .post('/', jwtAuth, validate(createEmployeeRules), createEmployee)
  .get('/:id', validate(idRules), findEmployee)
  .delete('/:id', jwtAuth, validate(idRules), deleteEmployee)
  .put('/:id', jwtAuth, validate(updateEmployeeRules), updateEmployee);

module.exports = router;
