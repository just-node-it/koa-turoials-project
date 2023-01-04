const prisma = require('../config/db');

module.exports = {
  async findAll() {
    return prisma.classification.findMany();
  },

  async findOne(classificationId) {
    return prisma.classification.findUnique({
      where: {
        id: classificationId,
      },
    });
  },

  async create(classificationData) {
    return prisma.classification.create({
      data: classificationData,
    });
  },

  async update(classificationId, classificationData) {
    return prisma.classification.update({
      where: {
        id: classificationId,
      },
      data: classificationData,
    });
  },

  async delete(classificationId) {
    return prisma.classification.delete({
      where: {
        id: classificationId,
      },
    });
  },

  async findTree(classificationId) {
    const classificationTree =
      await prisma.$queryRaw`WITH RECURSIVE classificationTree AS(
          SELECT id, "parentCategoryId", name
          FROM classifications 
          WHERE id = ${classificationId}
          UNION
          SELECT
              c.id, c."parentCategoryId", c.name
          FROM
              classifications c
          INNER JOIN classificationTree t ON t."parentCategoryId" = c.id
        ) SELECT * FROM classificationTree`;
    const treeReversedOrder = classificationTree.map(
      (classification) => classification.name,
    );
    return treeReversedOrder.reverse();
  },
};
