var express = require('express');
var auth = require('../modules/auth-middleware.js');

// Controllers
var routeProduct = require(__BASE + '/apis/controllers/product');
var routeCategory = require(__BASE + '/apis/controllers/category');
var routeMember = require(__BASE + '/apis/controllers/member');
var routeAuth = require(__BASE + '/apis/controllers/auth');

// Config routes
//-----------------------------------------------
var router = express.Router();
var generalRole = 2;
var specialRole = 100;
var adminRole = 1001;

router.route('/product')
    .post(auth(specialRole), routeProduct.createProduct)
    .get(routeProduct.getAllProduct);
router.route('/product/:productId')
    .get(routeProduct.getProductDetail)
    .put(auth(specialRole), routeProduct.updateProduct)
    .delete(auth(specialRole), routeProduct.deleteProduct);
router.route('/products/find-params')
    .get(routeProduct.findByParams);
router.route('/products/find-most-bid')
    .get(routeProduct.findMostBid);
router.route('/products/find-most-price')
    .get(routeProduct.findMostPrice);
router.route('/products/find-nearly-end-date')
    .get(routeProduct.findNearlyEndDate);
router.route('/products/count')
    .get(routeProduct.countProduct);
router.route('/products/update-bid/:productId')
    .put(auth(generalRole), routeProduct.updateProductBid);

router.route('/category')
    .post(auth(adminRole), routeCategory.createCategory)
    .get(routeCategory.getAllCategory);
router.route('/category/:categoryId')
    .get(routeCategory.getCategoryDetail)
    .put(auth(adminRole), routeCategory.updateCategory)
    .delete(auth(adminRole), routeCategory.deleteCategory);

router.route('/member')
    .post(auth(adminRole), routeMember.createMember)
    .get(routeMember.getAllMember);
router.route('/member/:memberId')
    .get(routeMember.getMemberDetail)
    .put(auth(generalRole), routeMember.updateMember)
    .delete(auth(adminRole), routeMember.deleteMember);
router.route('/member-wishlist')
    .get(auth(generalRole), routeMember.getWishList)
    .put(auth(generalRole), routeMember.updateWishList);
router.route('/member-wishlist-detail')
    .get(auth(generalRole), routeMember.getWishListDetail);
router.route('/member-biddinglist')
    .get(auth(generalRole), routeMember.getBiddingList)
    .put(auth(generalRole), routeMember.updateBiddingList);

router.route('/register')
    .post(routeAuth.registerMember);
router.route('/login')
    .post(routeAuth.login);
router.route('/profile')
    .get(auth(generalRole), routeAuth.getProfile);


// 404 handler
router.use('*', function(req, res, next) {
    return res.status(404).json({
        message: 'Bad URL'
    });
});

//-----------------------------------------------
module.exports = router;