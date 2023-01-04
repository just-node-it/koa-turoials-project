const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (!(error instanceof PrismaClientKnownRequestError)) {
      throw error;
    }

    console.error({ error }); // you can create fancier logging system
    switch (error.code) {
      case 'P2002': {
        ctx.status = 409;
        ctx.body = { message: 'Conflict' };
        break;
      }
      case 'P2025': {
        ctx.status = 404;
        ctx.body = { message: 'Resource was not found' };
        break;
      }
      case 'P2003': {
        ctx.status = 400;
        ctx.body = { message: 'Foreign key constraint failed' };
        break;
      }
      case 'P2018': {
        ctx.status = 400;
        ctx.body = {
          message: 'The required connected records were not found.',
        };
        break;
      }
      default: {
        ctx.status = 500;
        ctx.body = { message: 'Internal Server Error' };
      }
    }
  }
};
