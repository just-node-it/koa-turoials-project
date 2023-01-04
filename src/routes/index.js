const animalRoute = require('./animal');
const authRoute = require('./auth');
const classificationRoute = require('./classification');
const employeeRoute = require('./employee');
const eventRoute = require('./event');
const expositionRoute = require('./exposition');
const orderRoute = require('./order');
const ticketRoute = require('./ticket');

module.exports = (app) => {
  // register routes
  app.use(animalRoute.routes());
  app.use(authRoute.routes());
  app.use(classificationRoute.routes());
  app.use(employeeRoute.routes());
  app.use(eventRoute.routes());
  app.use(expositionRoute.routes());
  app.use(orderRoute.routes());
  app.use(ticketRoute.routes());

  // register middleware for responding OPTIONS requests
  // with an Allow header containing the allowed methods
  // or responding with 405/501 as appropriate
  app.use(animalRoute.allowedMethods());
  app.use(authRoute.allowedMethods());
  app.use(classificationRoute.allowedMethods());
  app.use(employeeRoute.allowedMethods());
  app.use(eventRoute.allowedMethods());
  app.use(expositionRoute.allowedMethods());
  app.use(orderRoute.allowedMethods());
  app.use(ticketRoute.allowedMethods());
};
