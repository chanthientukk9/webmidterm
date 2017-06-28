var express = require('express');

// Controllers
var routeProduct = require(__BASE + '/apis/controllers/product');
var routeCategory = require(__BASE + '/apis/controllers/category');
var routeMember = require(__BASE + '/apis/controllers/member');
var routeAuth = require(__BASE + '/apis/controllers/auth');

// Config routes
//-----------------------------------------------
var router = express.Router();

router.route('/product')
    .post(routeProduct.createProduct)
    .get(routeProduct.getAllProduct);
router.route('/product/:productId')
    .get(routeProduct.getProductDetail)
    .put(routeProduct.updateProduct)
    .delete(routeProduct.deleteProduct);
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
    .put(routeProduct.updateProductBid);

router.route('/category')
    .post(routeCategory.createCategory)
    .get(routeCategory.getAllCategory);
router.route('/category/:categoryId')
    .get(routeCategory.getCategoryDetail)
    .put(routeCategory.updateCategory)
    .delete(routeCategory.deleteCategory);

router.route('/member')
    .post(routeMember.createMember)
    .get(routeMember.getAllMember);
router.route('/member/:memberId')
    .get(routeMember.getMemberDetail)
    .put(routeMember.updateMember)
    .delete(routeMember.deleteMember);

router.route('/register')
    .post(routeAuth.registerMember);

// 404 handler
router.use('*', function(req, res, next) {
    return res.status(404).json({
        message: 'Bad URL'
    });
});

//-----------------------------------------------
module.exports = router;