const router = require('express').Router();

const { getFullProduct, getProduct,getProductByProductType, postProduct, postFullProduct, updateProduct } = require('../controllers/Product.js')

router.get('/', getFullProduct);
router.get('/:_id', getProduct);
router.get('/?',getProductByProductType)
router.post('/', postProduct);
router.post('/full',postFullProduct)
router.patch('/',updateProduct);

module.exports = router;