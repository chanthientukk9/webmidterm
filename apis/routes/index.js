var express = require('express');

// Controllers
var routeProduct = require(__BASE + '/apis/controllers/product');

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

// 404 handler
router.use('*', function(req, res, next) {
    return res.status(404).json({
        message: 'Bad URL'
    });
});

//-----------------------------------------------
module.exports = router;