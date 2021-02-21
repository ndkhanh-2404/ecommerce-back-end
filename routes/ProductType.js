const router = require('express').Router();

const { getFullProductType, postProductType, postFullProductType } = require('../controllers/ProductType.js')

router.get('/', getFullProductType);
router.post('/', postProductType);
router.post('/full', postFullProductType );
module.exports = router;