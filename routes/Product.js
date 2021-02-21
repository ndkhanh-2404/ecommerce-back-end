const router = require('express').Router();

const { getFullProduct, getProduct,searchProduct, postProduct, postFullProduct, updateProduct } = require('../controllers/Product.js')


router.get('/search/?',searchProduct)
router.get('/?', getFullProduct);
router.get('/:_id', getProduct);

router.post('/', postProduct);
router.post('/full',postFullProduct)
router.patch('/',updateProduct);

module.exports = router;