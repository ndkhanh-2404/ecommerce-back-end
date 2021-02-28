const router = require('express').Router();
const { signup, signin, getProfile } = require('../../controllers/admin/auth.js');
const { validateSignupRequest,validateSigninRequest, isRequestValidated } =  require('../../validations/auth.js');
const {requireSignin } = require('../../common-middleware');


router.post('/admin/signin',validateSigninRequest, isRequestValidated, signin );
router.post('/admin/signup',validateSignupRequest, isRequestValidated, signup );
router.get('/admin/profile', requireSignin,getProfile )

module.exports = router;