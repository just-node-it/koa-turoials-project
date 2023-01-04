const prisma = require('../config/db');
const AppError = require('../utils/app-error');

const OrderStateEnum = {
  NEW: 'NEW',
  PROCESSED: 'PROCESSED',
  FINISHED: 'FINISHED',
  REJECTED: 'REJECTED',
};

module.exports = {
  async findAll() {
    return prisma.order.findMany({
      include: {
        orderItems: true,
      },
    });
  },

  async findOne(orderId) {
    return prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: true,
      },
    });
  },

  async create(orderData) {
    const { orderItems, ...data } = orderData;
    return prisma.order.create({
      data: {
        ...orderData,
        // nested writes
        orderItems: {
          create: orderItems,
        },
      },
      include: {
        orderItems: true,
      },
    });
  },

  async updateState(orderId, newState) {
    if (newState === OrderStateEnum.NEW) {
      throw AppError.badRequest(
        `${newState} state is unacceptable. See the order state flow.`,
      );
    }
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      throw AppError.notFound();
    }

    if (
      order.state === OrderStateEnum.FINISHED ||
      order.state === OrderStateEnum.REJECTED ||
      (order.state === OrderStateEnum.NEW &&
        newState === OrderStateEnum.FINISHED)
    ) {
      throw AppError.badRequest(
        'Unexpected state transit. See the order state flow.',
      );
    }
    return prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        state: newState,
      },
      include: {
        orderItems: true,
      },
    });
  },
};
