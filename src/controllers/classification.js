const classificationService = require('../services/classification');

module.exports = {
  findClassifications: async (ctx) => {
    const classifications = await classificationService.findAll();
    ctx.status = 200;
    ctx.body = classifications;
  },

  findClassification: async (ctx) => {
    const {
      params: { id },
    } = ctx.request;

    const classification = await classificationService.findOne(id);
    if (!classification) {
      ctx.status = 404;
    } else {
      ctx.body = classification;
    }
  },

  createClassification: async (ctx) => {
    const { body } = ctx.request;
    const classification = await classificationService.create(body);
    ctx.status = 201;
    ctx.body = classification;
  },

  deleteClassification: async (ctx) => {
    const {
      params: { id },
    } = ctx.request;
    await classificationService.delete(id);
    ctx.status = 204;
  },

  updateClassification: async (ctx) => {
    const {
      params: { id },
      body,
    } = ctx.request;
    const classification = await classificationService.update(id, body);
    ctx.body = classification;
  },

  findClassificationTree: async (ctx) => {
    const {
      params: { id },
    } = ctx.request;
    const classificationTree = await classificationService.findTree(id);
    ctx.body = classificationTree;
  },
};
