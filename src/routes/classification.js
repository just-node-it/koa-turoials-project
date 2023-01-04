const {
  validators: { idRules, classificationValidator, validate },
  jwtAuth,
} = require('../middlewares');

const KoaRouter = require('koa-router');
const router = new KoaRouter();

const { createClassificationRules, updateClassificationRules } =
  classificationValidator;
const {
  findClassifications,
  findClassification,
  createClassification,
  deleteClassification,
  updateClassification,
  findClassificationTree,
} = require('../controllers/classification');

router
  .prefix('/classifications')
  .get('/', findClassifications)
  .post('/', jwtAuth, validate(createClassificationRules), createClassification)
  .get('/:id', validate(idRules), findClassification)
  .delete('/:id', jwtAuth, validate(idRules), deleteClassification)
  .put(
    '/:id',
    jwtAuth,
    validate(updateClassificationRules),
    updateClassification,
  )
  .get('/:id/tree', validate(idRules), findClassificationTree);

module.exports = router;
