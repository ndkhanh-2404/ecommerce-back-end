const router = require('express').Router();
const { signup, signin, getProfile } = require('../controllers/auth.js');
const { validateSignupRequest,validateSigninRequest, isRequestValidated } =  require('../validations/auth.js');
const { requireSignin } = require('../common-middleware/index.js')


router.post('/signin',validateSigninRequest, isRequestValidated, signin );
router.post('/signup',validateSignupRequest, isRequestValidated, signup );
router.get('/profile', requireSignin,getProfile )

module.exports = router;
