var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports.getAllProduct = function(req, res, next) {
    console.log("Haha " + req.query.limit);
    var limit = parseInt(req.query.limit);
    Product.find({})
        .sort({
            timestamp: -1
        })
        .limit(limit)
        .exec()
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                })
            } else {
                return res.status(200).json(product);
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Cannot get product list'
            });
        });
}

module.exports.findByParams = function(req, res, next) {
    var objParams = {};
    if (req.query.category) {
        objParams.category = req.query.category;
    }
    if (req.query.status) {
        objParams.status = req.query.status;
    }
    Product.find(objParams)
        .exec()
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            } else {
                return res.status(200).json(product);
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Can not found product"
            });
        });
}

module.exports.getProductDetail = function(req, res, next) {
    Product.findById(req.params.productId)
        .exec()
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                })
            } else {
                return res.status(200).json(product);
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Cannot get product'
            });
        });
}

module.exports.createProduct = function(req, res, next) {
    Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            urlMedia: req.body.urlMedia,
            status: req.body.status,
            attributes: req.body.attributes,
            seller: req.body.seller,
            location: req.body.location,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        })
        .then((product) => {
            return res.status(200).json(product);
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Cannot create product'
            })
        })
}

module.exports.updateProduct = function(req, res, next) {
    Product.findByIdAndUpdate({
            _id: req.params.productId
        }, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            urlMedia: req.body.urlMedia,
            status: req.body.status,
            attributes: req.body.attributes,
            seller: req.body.seller,
            location: req.body.location,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        })
        .exec().then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: 'product not found'
                });
            } else {
                return res.status(200).json(product);
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'error'
            });
        })
}

module.exports.deleteProduct = function(req, res, next) {
    Product.findByIdAndRemove({
            _id: req.params.productId
        })
        .exec().then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: 'product not found'
                })
            } else {
                return res.status(200).json({
                    message: 'success'
                })
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'error'
            })
        })
}

module.exports.findMostBid = function(req, res, next) {
    var limit = parseInt(req.query.limit);
    Product.find({})
        .sort({
            amountBid: -1
        })
        .limit(limit)
        .exec()
        .then((product) => {
            if (!product) {
                return res.status(400).json({
                    message: 'product not found'
                });
            } else {
                return res.status(200).json(product);
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not find product'
            })
        })
}

module.exports.findMostPrice = function(req, res, next) {
    var limit = parseInt(req.query.limit);
    Product.find({})
        .sort({
            finalPrice: -1
        })
        .limit(limit)
        .exec()
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            } else {
                return res.status(200).json(product);
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not find product'
            });
        })
}

module.exports.findNearlyEndDate = function(req, res, next) {
    var limit = parseInt(req.query.limit);
    var now = Date.now();
    Product.find({})
        .where('endDate').gt(now)
        .sort({
            endDate: 1
        })
        .limit(limit)
        .exec()
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            } else {
                return res.status(200).json(product);
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not find product'
            });
        })
}