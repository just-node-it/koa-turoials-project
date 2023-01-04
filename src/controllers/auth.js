const authService = require('../services/auth');

module.exports = {
  registerUser: async (ctx) => {
    const accessToken = await authService.register(ctx.request.body);
    ctx.body = accessToken;
  },

  loginUser: async (ctx) => {
    const accessToken = await authService.login(ctx.request.body);
    ctx.body = accessToken;
  },
};
