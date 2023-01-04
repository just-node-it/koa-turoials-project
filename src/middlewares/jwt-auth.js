const jwt = require('jsonwebtoken');
const userService = require('../services/user');
const AppError = require('../utils/app-error');

function jwtVerification(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw AppError.forbidden('JWT verification failed.');
  }
}

module.exports = async (ctx, next) => {
  if (!ctx.headers.authorization) {
    throw AppError.forbidden();
  }

  const token = ctx.headers.authorization.replace('Bearer ', '');
  if (!token) {
    throw AppError.forbidden();
  }

  const decoded = jwtVerification(token);
  const user = await userService.findOne({ id: decoded.sub });

  if (!user) {
    throw AppError.forbidden();
  }

  ctx.state.user = user;
  await next();
};
