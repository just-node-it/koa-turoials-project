const {
  validators: { idRules, validate, ticketValidator },
  jwtAuth,
} = require('../middlewares');

const KoaRouter = require('koa-router');
const router = new KoaRouter();

const { createTicketRules, updateTicketRules } = ticketValidator;
const {
  findTickets,
  findTicket,
  createTicket,
  updateTicket,
} = require('../controllers/ticket');

router
  .prefix('/tickets')
  .get('/', findTickets)
  .post('/', jwtAuth, validate(createTicketRules), createTicket)
  .get('/:id', validate(idRules), findTicket)
  .put('/:id', jwtAuth, validate(updateTicketRules), updateTicket);

module.exports = router;
