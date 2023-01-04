const prisma = require('../config/db');
const classificationService = require('../services/classification');
const AppError = require('../utils/app-error');

module.exports = {
  async findAll(query) {
    const queryObject = {
      // include all fields for specific relations
      include: {
        classification: true,
        employee: true,
      },
    };

    if ('sort' in query) {
      queryObject.orderBy = {
        dateArrived: query.sort, // sort by dateArrived as we agreed
      };
    }

    if ('classificationId' in query) {
      queryObject.where = {
        classification: {
          id: query.classificationId, // filter list of relation
        },
      };
    }

    if ('age' in query) {
      const ageFilters = {};
      Object.keys(query.age).forEach((key) => {
        ageFilters[key] = query.age[key];
      });

      queryObject.where = {
        ...queryObject.where,
        age: ageFilters,
      };
    }

    if (query.photo) {
      const queryPhoto = query.photo
        ? { NOT: [{ photo: null }] }
        : { photo: null };
      queryObject.where = { ...queryObject.where, ...queryPhoto };
    }

    if (query.parentsIncluded) {
      queryObject.include = {
        ...queryObject.include,
        parents: {
          select: {
            parent: true,
          },
        },
      };
    }

    if (query.childrenIncluded) {
      queryObject.include = {
        ...queryObject.include,
        children: {
          select: {
            child: true,
          },
        },
      };
    }

    return prisma.animal.findMany(queryObject);
  },

  async findOne(animalId, query) {
    const queryObject = {
      where: { id: animalId },
      include: { classification: true, employee: true },
    };

    if (query.parentsIncluded) {
      queryObject.include = {
        ...queryObject.include,
        parents: {
          select: {
            parent: true,
          },
        },
      };
    }

    if (query.childrenIncluded) {
      queryObject.include = {
        ...queryObject.include,
        children: {
          select: {
            child: true,
          },
        },
      };
    }

    const animal = await prisma.animal.findUnique(queryObject);
    if (!animal) {
      throw AppError.notFound();
    }

    if (query.classificationTree) {
      let classificationTree = [];
      classificationTree = await classificationService.findTree(
        animal.classificationId,
      );
      return { animal, classificationTree };
    }
    return animal;
  },

  async create(animalData) {
    const includeObject = { classification: true, employee: true };
    const { parents, children, ...data } = animalData;
    if (!parents && !children) {
      return prisma.animal.create({
        data: animalData,
        include: includeObject,
      });
    }
    return prisma.$transaction(async (trx) => {
      const animal = await trx.animal.create({ data, include: includeObject });
      const animalRelations = [];
      if (parents) {
        for (const parent of parents) {
          const parentsRelation = await trx.parentChild.create({
            data: { parentId: parent, childId: animal.id },
          });
          animalRelations.push({ parent: parentsRelation });
        }
      }
      if (children) {
        for (const child of children) {
          const childrenRelations = await trx.parentChild.create({
            data: { parentId: animal.id, childId: child },
          });
          animalRelations.push({ child: childrenRelations });
        }
      }
      return { ...animal, relations: animalRelations };
    });
  },

  async update(animalId, animalData) {
    return prisma.animal.update({
      where: {
        id: animalId,
      },
      data: animalData,
    });
  },

  async delete(animalId) {
    return prisma.animal.delete({
      where: {
        id: animalId,
      },
    });
  },

  async addChild(animalId, childId) {
    return prisma.parentChild.create({
      data: {
        parentId: animalId,
        childId,
      },
    });
  },

  async addParent(animalId, parentId) {
    return prisma.parentChild.create({
      data: {
        parentId,
        childId: animalId,
      },
    });
  },

  async deleteChild(animalId, childId) {
    return prisma.parentChild.delete({
      where: {
        // compound key
        parentId_childId: {
          parentId: animalId,
          childId,
        },
      },
    });
  },

  async deleteParent(animalId, parentId) {
    return prisma.parentChild.delete({
      where: {
        // compound key
        parentId_childId: {
          parentId,
          childId: animalId,
        },
      },
    });
  },
};
