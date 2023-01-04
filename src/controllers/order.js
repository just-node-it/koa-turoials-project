const orderService = require('../services/order');

module.exports = {
  findOrders: async (ctx) => {
    const orders = await orderService.findAll();
    ctx.status = 200;
    ctx.body = orders;
  },

  findOrder: async (ctx) => {
    const {
      params: { id },
    } = ctx.request;

    const order = await orderService.findOne(id);
    if (!order) {
      ctx.status = 404;
    } else {
      ctx.body = order;
    }
  },

  createOrder: async (ctx) => {
    const { body } = ctx.request;
    const order = await orderService.create(body);
    ctx.status = 201;
    ctx.body = order;
  },

  changeOrderStatus: async (ctx) => {
    const {
      body,
      params: { id },
    } = ctx.request;

    const order = await orderService.updateState(id, body.state);
    ctx.body = order;
  },
};
