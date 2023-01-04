const {
  validators: { eventValidator, idRules, validate },
  jwtAuth,
} = require('../middlewares');

const KoaRouter = require('koa-router');
const router = new KoaRouter();

const { createEventRules, updateEventRules } = eventValidator;
const {
  findEvents,
  findEvent,
  createEvent,
  deleteEvent,
  updateEvent,
} = require('../controllers/event');

router
  .prefix('/events')
  .get('/', findEvents)
  .post('/', jwtAuth, validate(createEventRules), createEvent)
  .get('/:id', validate(idRules), findEvent)
  .delete('/:id', jwtAuth, validate(idRules), deleteEvent)
  .put('/:id', jwtAuth, validate(updateEventRules), updateEvent);

module.exports = router;
