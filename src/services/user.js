const prisma = require('../config/db');

module.exports = {
  findOne(searchedParam) {
    const searchedByObject = searchedParam.id
      ? { id: searchedParam.id }
      : searchedParam.username
      ? { username: searchedParam.username }
      : { email: searchedParam.email };
    return prisma.user.findUnique({
      where: searchedByObject,
    });
  },

  create(userData) {
    return prisma.user.create({
      data: userData,
    });
  },
};
