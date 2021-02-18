const router = require('express').Router();

const { getFullProduct, getProduct, postProduct } = require('../controllers/Product.js')

router.get('/', getFullProduct);
router.get('/:_id', getProduct);
router.post('/', postProduct);

module.exports = router;