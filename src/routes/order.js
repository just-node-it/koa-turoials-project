const {
  validators: { idRules, validate, orderValidator },
  jwtAuth,
} = require('../middlewares');

const KoaRouter = require('koa-router');
const router = new KoaRouter();

const { createOrderRules, updateOrderState } = orderValidator;
const {
  findOrders,
  findOrder,
  createOrder,
  changeOrderStatus,
} = require('../controllers/order');

router
  .prefix('/orders')
  .get('/', jwtAuth, findOrders)
  .post('/', validate(createOrderRules), createOrder)
  .get('/:id', jwtAuth, validate(idRules), findOrder)
  .put('/:id/state', jwtAuth, validate(updateOrderState), changeOrderStatus);

module.exports = router;
