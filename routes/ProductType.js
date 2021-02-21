const router = require('express').Router();

const { getFullProductType, postProductType, postFullProductType } = require('../controllers/ProductType.js')

router.get('/type', getFullProductType);
router.post('/type', postProductType);
router.post('/type/full', postFullProductType );
module.exports = router;