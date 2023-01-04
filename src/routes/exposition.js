const {
  validators: { idRules, validate, expositionValidator },
  jwtAuth,
} = require('../middlewares');

const KoaRouter = require('koa-router');
const router = new KoaRouter();

const { createExpositionRules, updateExpositionRules } = expositionValidator;
const {
  findExpositions,
  findExposition,
  createExposition,
  deleteExposition,
  updateExposition,
} = require('../controllers/exposition');

router
  .prefix('/expositions')
  .get('/', findExpositions)
  .post('/', jwtAuth, validate(createExpositionRules), createExposition)
  .get('/:id', validate(idRules), findExposition)
  .delete('/:id', jwtAuth, validate(idRules), deleteExposition)
  .put('/:id', jwtAuth, validate(updateExpositionRules), updateExposition);

module.exports = router;
