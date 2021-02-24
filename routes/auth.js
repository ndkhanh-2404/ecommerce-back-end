const router = require('express').Router();
const { signup, signin } = require('../controllers/auth.js');
const { validateSignupRequest,validateSigninRequest, isRequestValidated } =  require('../validations/auth.js');

router.post('/signin',validateSigninRequest, isRequestValidated, signin );
router.post('/signup',validateSignupRequest, isRequestValidated, signup );


module.exports = router;
