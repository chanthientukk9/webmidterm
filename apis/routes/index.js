var express = require('express');

// Controllers
var routeProduct = require(__BASE + '/apis/controllers/product');
var routeCategory = require(__BASE + '/apis/controllers/category');
var routeMember = require(__BASE + '/apis/controllers/member');

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

// 404 handler
router.use('*', function(req, res, next) {
    return res.status(404).json({
        message: 'Bad URL'
    });
});

//-----------------------------------------------
module.exports = router;