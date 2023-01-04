const animalService = require('../services/animal');

module.exports = {
  findAnimals: async (ctx) => {
    const { query } = ctx.request;
    const animals = await animalService.findAll(query);
    ctx.body = animals;
  },

  findAnimal: async (ctx) => {
    const {
      params: { id },
      query,
    } = ctx.request;
    const animal = await animalService.findOne(id, query);
    if (!animal) {
      ctx.status = 404;
    } else {
      ctx.body = animal;
    }
  },

  createAnimal: async (ctx) => {
    const { body } = ctx.request;
    const animal = await animalService.create(body);
    ctx.status = 201;
    ctx.body = animal;
  },

  editAnimal: async (ctx) => {
    const {
      params: { id },
      body,
    } = ctx.request;
    const animal = await animalService.update(id, body);
    ctx.body = animal;
  },

  deleteAnimal: async (ctx) => {
    const {
      params: { id },
    } = ctx.request;
    await animalService.delete(id);
    ctx.status = 204;
  },

  addChild: async (ctx) => {
    const { id, childId } = ctx.request.params;
    const animal = await animalService.addChild(id, childId);
    ctx.body = animal;
  },

  removeChild: async (ctx) => {
    const { id, childId } = ctx.request.params;
    await animalService.deleteChild(id, childId);
    ctx.status = 204;
  },

  addParent: async (ctx) => {
    const { id, parentId } = ctx.request.params;
    const animal = await animalService.addParent(id, parentId);
    ctx.body = animal;
  },

  removeParent: async (ctx) => {
    const { id, parentId } = ctx.request.params;
    await animalService.deleteParent(id, parentId);
    ctx.status = 204;
  },
};
