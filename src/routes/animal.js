const {
  validators: { idRules, validate, animalValidator },
  jwtAuth,
} = require('../middlewares');

const KoaRouter = require('koa-router');
const router = new KoaRouter();

const {
  findAnimals,
  findAnimal,
  createAnimal,
  editAnimal,
  deleteAnimal,
  addChild,
  removeChild,
  addParent,
  removeParent,
} = require('../controllers/animal');

const {
  createAnimalRules,
  updateAnimalRules,
  addRemoveChildRules,
  addRemoveParentRules,
  findAnimalRules,
  findAnimalsRules,
} = animalValidator;

router
  .prefix('/animals')
  .get('/', validate(findAnimalsRules), findAnimals)
  .post('/', jwtAuth, validate(createAnimalRules), createAnimal)
  .get('/:id', validate(findAnimalRules), findAnimal)
  .put('/:id', jwtAuth, validate(updateAnimalRules), editAnimal)
  .delete('/:id', jwtAuth, validate(idRules), deleteAnimal)
  .post('/:id/child/:childId', jwtAuth, validate(addRemoveChildRules), addChild)
  .delete(
    '/:id/child/:childId',
    jwtAuth,
    validate(addRemoveChildRules),
    removeChild,
  )
  .post(
    '/:id/parent/:parentId',
    jwtAuth,
    validate(addRemoveParentRules),
    addParent,
  )
  .delete(
    '/:id/parent/:parentId',
    jwtAuth,
    validate(addRemoveParentRules),
    removeParent,
  );

module.exports = router;
