const express = require('express');

const router = express.Router();


const productController = require('../controllers/product');

router.get('/enterproduct', productController.getProductPage);
router.post('/enterproduct', productController.postProductPage);


router.get('/remove-product/:productid', productController.getCartPage);
router.post('/filterproducts', productController.getFilterProductsPage);

module.exports = router;
