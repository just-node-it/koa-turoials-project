const {
  authValidator: { registerRules, loginRules },
  validate,
} = require('../middlewares/validators');

const KoaRouter = require('koa-router');
const router = new KoaRouter();

const { registerUser, loginUser } = require('../controllers/auth');

router.post('/auth/register', validate(registerRules), registerUser);
router.post('/auth/login', validate(loginRules), loginUser);

module.exports = router;
