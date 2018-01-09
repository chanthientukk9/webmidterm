var express = require('express');
var auth = require('../modules/auth-middleware.js');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './upload' });

// Controllers
var routeProduct = require(__BASE + '/apis/controllers/product');
var routeCategory = require(__BASE + '/apis/controllers/category');
var routeMember = require(__BASE + '/apis/controllers/member');
var routeAuth = require(__BASE + '/apis/controllers/auth');

var routeCustomer = require(__BASE + '/apis/controllers/customer');
var routeDriver = require(__BASE + '/apis/controllers/driver');


// Config routes
//-----------------------------------------------
var router = express.Router();
var generalRole = 2;
var specialRole = 100;
var adminRole = 1001;
var waitingRole = 765;

router.route('/customer')
    .get(routeCustomer.getAllCustomers)
    .post(routeCustomer.createCustomer)
router.route('/customer/status')
    .get(routeCustomer.getCustomers)
router.route('/customer/detail/:customerId')
    .get(routeCustomer.getCustomerDetail)
    .put(routeCustomer.updateCustomer)
router.route('/customer/near-drivers')
    .post(routeDriver.nearDrivers)

router.route('/driver')
    .get(routeDriver.getAllDrivers)
    .post(routeDriver.createDriver)
router.route('/driver/status')
    .get(routeDriver.getDrivers)
router.route('/driver/detail/:driverId')
    .get(routeDriver.getDriverDetail)
    .put(routeDriver.updateDriver)
router.route('/driver/login')
    .post(routeDriver.login)
router.route('/driver/me/profile')
    .get(auth(generalRole), routeDriver.getProfile)
router.route('/driver/me/reply-invitation')
    .put(auth(generalRole), routeDriver.replyInvitation)

router.route('/product')
    .post(auth(specialRole), routeProduct.createProduct)
    .get(routeProduct.getAllProduct);
router.route('/product/:productId')
    .get(routeProduct.getProductDetail)
    .put(auth(specialRole), routeProduct.updateProduct)
    .delete(auth(adminRole), routeProduct.deleteProduct);
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
router.route('/products/kick-bidder')
    .post(auth(specialRole), routeProduct.kickBidder);
router.route('/products/scan-database')
    .get(auth(adminRole), routeProduct.scanDatabase);

router.route('/category')
    .post(auth(adminRole), routeCategory.createCategory)
    .get(routeCategory.getAllCategory);
router.route('/category/:categoryId')
    .get(routeCategory.getCategoryDetail)
    .put(auth(adminRole), routeCategory.updateCategory)
    .delete(auth(adminRole), routeCategory.deleteCategory);

router.route('/member')
    .post(auth(adminRole), routeMember.createMember)
    .get(auth(adminRole), routeMember.getAllMember);
router.route('/member/:memberId')
    .get(routeMember.getMemberDetail)
    .put(auth(generalRole), routeMember.updateMember)
    .delete(auth(adminRole), routeMember.deleteMember);
router.route('/member-wishlist')
    .get(auth(generalRole), routeMember.getWishList)
    .put(auth(generalRole), routeMember.updateWishList);
// router.route('/member-wishlist-detail')
//     .get(auth(generalRole), routeMember.getWishListDetail);
router.route('/member-biddinglist')
    .get(auth(generalRole), routeMember.getBiddingList)
    .put(auth(generalRole), routeMember.updateBiddingList);
router.route('/member-biddedlist')
    .get(auth(generalRole), routeMember.getBiddedList)
    .put(auth(generalRole), routeMember.updateBiddedList);
router.route('/member-sellinglist')
    .get(auth(specialRole), routeMember.getSellingList)
    .put(auth(specialRole), routeMember.updateSellingList);
router.route('/member-soldlist')
    .get(auth(specialRole), routeMember.getSoldList)
    .put(auth(specialRole), routeMember.updateSoldList);
router.route('/vote-point')
    .post(auth(generalRole), routeMember.votePoint);

router.route('/register')
    .post(routeAuth.registerMember);
router.route('/login')
    .post(routeAuth.login);
router.route('/profile')
    .get(auth(generalRole), routeAuth.getProfile);
router.route('/member-upgrade')
    .get(auth(waitingRole), routeAuth.upgradeMember);
router.route('/allow-upgrade')
    .put(auth(adminRole), routeAuth.allowUpgrade);



router.post('/upload', multipartMiddleware, function(req, res) {
    console.log(req.body, req.files);
    return res.json(req.files.file);
});

router.get('/download/:path', function(req, res) {
    res.sendfile(req.params.path);
})

// 404 handler
router.use('*', function(req, res, next) {
    return res.status(404).json({
        message: 'Bad URL'
    });
});

//-----------------------------------------------
module.exports = router;