const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const mainController = require('../controllers/main');

router.get('/', mainController.getOutsideMainPage);

router.get('/login', mainController.getLoginPage);
router.post('/login', mainController.postLoginPage);
router.get('/logout', mainController.getLogoutPage);

router.get('/signup', mainController.getSignupPage);
router.post('/signup', mainController.postSignupPage);

router.get('/enter', auth, mainController.getMainPage);

router.get('/shop', auth, mainController.getShopPage);

router.get('/single-product', mainController.getSingleProductPage);

router.get('/cart', auth, mainController.getCartPage);
router.post('/cart', auth, mainController.postCartPage);
router.get('/addcartvialink/:productid', mainController.getCartPagevialink)

router.get('/checkout', auth, mainController.getCheckoutPage);
router.post('/checkout', auth, mainController.postCheckoutPage);

router.post('/order', auth, mainController.postOrderPage);


router.get('/seedetails/:productid', mainController.seeDetailsPage);


router.post('/singleaddtocart', mainController.singleGetToCartPage);


router.get('/myorders', auth, mainController.getMyOrdersPage);
router.post('/cancelorder', mainController.getCancelOrderPage);
router.get('/orderdetails/:orderid', mainController.getOrderDetailsPage);


router.get('/myprofile', auth, mainController.getMyProfilePage);
router.post('/saveprofile', mainController.getSaveProfilePage);


router.get('/category', auth, mainController.getCategoryPage);

module.exports = router;
