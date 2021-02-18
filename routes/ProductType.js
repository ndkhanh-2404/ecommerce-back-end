const router = require('express').Router();

const { getFullProductType, postProductType } = require('../controllers/ProductType.js')

router.get('/', getFullProductType);
router.post('/', postProductType);

module.exports = router;