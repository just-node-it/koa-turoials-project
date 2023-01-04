const Koa = require('koa');
const { koaBody } = require('koa-body');
require('dotenv').config();

const config = require('./config');
const routes = require('./routes');
const { apiErrorHandler, prismaClientErrorHandler } = require('./middlewares');

async function startServer() {
  const app = new Koa();
  require('koa-qs')(app);

  app.use(koaBody());
  app.use(apiErrorHandler);
  app.use(prismaClientErrorHandler);

  routes(app);

  app.listen(config.port, () => {
    console.log(`Server started on port: ${config.port}`);
  });
}

startServer();
