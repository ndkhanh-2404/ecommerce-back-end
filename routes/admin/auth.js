const router = require('express').Router();
const { signup, signin } = require('../../controllers/admin/auth.js');
const { validateSignupRequest,validateSigninRequest, isRequestValidated } =  require('../../validations/auth.js');

router.post('/admin/signin',validateSigninRequest, isRequestValidated, signin );
router.post('/admin/signup',validateSignupRequest, isRequestValidated, signup );


module.exports = router;