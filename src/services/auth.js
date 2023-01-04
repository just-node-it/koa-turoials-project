const { PrismaClientKnownRequestError } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require('../utils/app-error');
const userService = require('./user');

async function signJwtToken(userId, username) {
  const secret = process.env.JWT_SECRET;
  const payload = {
    sub: userId,
    username,
  };
  const accessToken = jwt.sign(payload, secret, {
    expiresIn: '20m',
  });
  return { accessToken };
}

module.exports = {
  async register(userData) {
    const { password, ...data } = userData;
    // generate hash from the plain password
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    try {
      const user = await userService.create({
        ...data,
        password: hash,
      });
      return signJwtToken(user.id, user.username);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw AppError.forbidden('Credentials taken.');
      }
    }
  },

  async login(userData) {
    const searchedByObject = userData.email
      ? { email: userData.email }
      : { username: userData.username };
    const user = await userService.findOne(searchedByObject);

    if (!user) {
      throw AppError.forbidden('Incorrect credentials. Try again.');
    }

    // password verification
    const pwsMatched = await bcrypt.compare(userData.password, user.password);
    if (!pwsMatched) {
      throw AppError.forbidden('Incorrect credentials. Try again.');
    }
    return signJwtToken(user.id, user.username);
  },
};
