module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error({ error });

    if (error.statusCode) {
      ctx.body = {
        message: error.message || 'Request failed',
      };
      ctx.status = error.statusCode;
    } else {
      ctx.status = 500;
      ctx.body = {
        error: 'Internal Server Error',
      };
    }
  }
};
