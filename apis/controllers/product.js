var mongoose = require('mongoose');
var Product = mongoose.model('Products');
var Member = mongoose.model('Members');
var emailService = require('../modules/email.js');


module.exports.scanDatabase = function(req, res, next) {

    var now = Date.now();

    Product.find({})
        // .sort({
        //     timestamp: -1
        // })
        .exec()
        .then((product) => {
            console.log("err hahahahahahashfbsdhjfsd");
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                })
            } else {

                for (var i = 0; i < product.length; i++) {
                    if (product[i].endDate >= now && product[i].status == 'notvalid') {
                        product[i].status = 'valid';
                    }
                    if (product[i].endDate < now && product[i].status == 'valid') {
                        product[i].status = 'notvalid';
                        var indexWonBidder = parseInt(product[i]['bidder'].length - 1);
                        console.log("capcap" + product[i].bidder);
                        var wonBidder = product[i].bidder[indexWonBidder];
                        var biddedList = null;
                        var biddingList = null;
                        var seller = product[i].seller;
                        var soldList = null;
                        var sellingList = null;
                        Member.findOne({
                                _id: wonBidder
                            })
                            .exec()
                            .then((member) => {
                                console.log("iiiiiiiiiiiiiiiiiiii");
                                if (!member) {
                                    console.log("Big member " + member);
                                    return res.status(404).json({
                                        message: 'Member not found'
                                    });
                                } else {
                                    console.log("iiiiiiiiiiiiiiiiiiii");
                                    biddingList = member.biddingList;
                                    biddedList = member.biddedList;
                                    biddingList.splice(biddingList.indexOf(product._id), 1);
                                    biddedList.push(product._id);
                                    console.log("iiiiiiiiiiiiiiiiiiii");
                                    Member.findByIdAndUpdate({
                                            _id: wonBidder
                                        }, {
                                            biddingList: biddingList,
                                            biddedList: biddedList
                                        })
                                        .exec()
                                        .then((member2) => {
                                            console.log("mem1 " + member2);
                                        }).catch((err) => {
                                            return res.status(500).json({
                                                message: err
                                            })
                                        })
                                }
                            }).catch((err) => {
                                return res.status(500).json({
                                    message: err
                                });
                            });
                        Member.findOne({
                                _id: selller
                            })
                            .exec()
                            .then((member) => {
                                if (!member) {
                                    return res.status(404).json({
                                        message: 'Member not found'
                                    });
                                } else {
                                    sellingList = member.sellingList
                                    soldList = member.soldList;
                                    sellingList.splice(sellingList.indexOf(product._id), 1);
                                    soldList.push(product._id);
                                    Member.findByIdAndUpdate({
                                            _id: wonBidder
                                        }, {
                                            sellingList: sellingList,
                                            soldList: soldList
                                        })
                                        .exec()
                                        .then((member2) => {
                                            console.log("mem2 " + member2);
                                        }).catch((err) => {
                                            return res.status(500).json({
                                                message: err
                                            })
                                        })
                                }
                            }).catch((err) => {
                                return res.status(500).json({
                                    message: err
                                });
                            });

                    }
                    Product.findByIdAndUpdate({
                            _id: product[i]._id
                        }, {
                            status: product[i].status
                        })
                        .exec()
                        .then((product2) => {
                            console.log("product2 " + product2);
                        }).catch((err) => {
                            return res.status(500).json({
                                message: err
                            });
                        });
                }
                return res.status(200).json(product);
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Cannot get product list'
            });
        });
}

module.exports.getAllProduct = function(req, res, next) {
    var limit = parseInt(req.query.limit);
    var page = parseInt(req.query.page);
    var now = Date.now();

    Product.find({})
        .sort({
            timestamp: -1
        })
        .limit(limit)
        .skip((page - 1) * limit)
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
    var limit = parseInt(req.query.limit);
    var page = parseInt(req.query.page);
    var objParams = {};
    if (req.query.category) {
        objParams.category = req.query.category;
    }
    if (req.query.status) {
        objParams.status = req.query.status;
    }
    if (req.query.name) {
        objParams.name = new RegExp(req.query.name, "i");
    }
    Product.find(objParams)
        .sort({
            timestamp: -1
        })
        .limit(limit)
        .skip((page - 1) * limit)
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
    var bidderList = [req.userData._id];
    Product.create({
            name: req.body.name,
            description: req.body.description,
            bidder: bidderList,
            price: req.body.price,
            stepPrice: req.body.stepPrice,
            finalPrice: req.body.price[0],
            urlMedia: req.body.urlMedia,
            status: 'Invalid',
            // attributes: req.body.attributes,
            seller: req.userData._id,
            location: req.body.location,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        })
        .then((product) => {
            var sellingList = null;

            Member.findOne({
                    _id: req.userData._id
                })
                .exec()
                .then((member) => {
                    sellingList = member.sellingList;
                    sellingList.push(product._id);
                    Member.findByIdAndUpdate({
                            _id: member._id
                        }, {
                            sellingList: sellingList
                        })
                        .exec()
                        .then((member2) => {
                            return res.status(200).json(product);
                        }).catch((err) => {
                            return res.status(500).json({
                                message: err
                            })
                        })
                }).catch((err) => {
                    return res.status(500).json({
                        message: err
                    })
                })
            return res.status(200).json(product);
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Cannot create product ' + err
            })
        })
}

module.exports.updateProduct = function(req, res, next) {
    var check = 0;
    Product.findOne({
            _id: req.params.productId,
            seller: req.userData._id
        })
        .exec()
        .then((product) => {
            if (!product) {
                check = 0;
            } else {
                check = 1;
            }
        }).catch((err) => {
            check = 0;
        })
    Member.findOne({
            _id: req.userData._id,
            srole: 1001
        })
        .exec()
        .then((member) => {
            if (!member) {

            } else {
                check = 1;
            }
        }).catch((err) => {

        });
    if (check == 1) {
        Product.findByIdAndUpdate({
                _id: req.params.productId
            }, {
                name: req.body.name,
                description: req.body.description,
                urlMedia: req.body.urlMedia,
                status: req.body.status,
                attributes: req.body.attributes,
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
    } else {
        return res.status(401).json({
            message: "You do hot have right"
        })
    }
}

module.exports.updateProductBid = function(req, res, next) {
    var memberData = null;
    var bidderList = null;
    Product.findOne({
            _id: req.params.productId
        }, 'bidder')
        .exec()
        .then((bidder) => {
            bidderList = bidder;
        }).catch((err) => {

        });

    Member.findOne({
            _id: req.userData._id
        })
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: 'Member not found'
                });
            } else {
                memberData = member;
                if (parseInt(memberData.point.total) != 0) {
                    if ((parseFloat(memberData.point.good) / parseFloat(memberData.point.total)) < 0.8) {
                        return res.status(500).json({
                            message: 'Not enough good point to do bid'
                        })
                    }
                }

                if (parseInt(req.body.finalPrice) >= (parseInt(req.body.price[parseInt(req.body.amountBid)]) + parseInt(req.body.stepPrice))) {
                    req.body.price.push(req.body.finalPrice);
                    req.body.amountBid++;
                    bidderList.push(memberData._id);
                    Product.findByIdAndUpdate({
                            _id: req.params.productId
                        }, {
                            price: req.body.price,
                            finalPrice: req.body.finalPrice,
                            amountBid: req.body.amountBid
                        })
                        .exec()
                        .then((product) => {
                            if (!product) {
                                return res.status(404).json({
                                    message: 'Product not found'
                                });
                            } else {
                                emailService.sendDoBidSuccess(req.userData.email, req.userData.email);
                                return res.status(200).json(product);
                            }
                        }).catch((err) => {
                            return res.status(500).json({
                                message: 'Can not do the bid'
                            });
                        })
                } else {
                    return res.status('500').json({
                        message: 'Invalid Price'
                    })
                }
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not get info'
            })
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
    var now = Date.now();
    Product.find({})
        .where('endDate').gt(now)
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

module.exports.countProduct = function(req, res, next) {

    var obj = {};
    if (req.query.category) {
        obj.category = req.query.category;
    }
    if (req.query.name) {
        obj.name = new RegExp(req.query.name, "i");
    }
    Product.count(obj)
        .exec()
        .then((count) => {
            return res.status(200).json({
                count: count
            });
        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not count product'
            });
        })
}

module.exports.kickBidder = function(req, res, next) {

    var bidder = req.body.bidderId;

    var bidderList = null;
    var priceList = null;
    var biddingList = null;

    var flag = 0;
    var indexBidder = 0;
    Product.findOne({
            _id: req.body.productId,
            seller: req.userData._id
        })
        .exec()
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            } else {
                bidderList = product.bidder;
                priceList = product.price;
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Err: ' + err
            })
        });

    for (var i = 0; i < bidderList.length; i++) {
        if (bidderList[i] == bidder) {
            bidderList.splice(i, 1);
            priceList.splice(i, 1);
            flag = 1;
        }
    }

    if (flag == 0) {
        return res.status(500).json({
            message: 'Bidder not in list'
        });
    }

    Product.findByIdAndUpdate({
            _id: req.body.productId,
            seller: req.userData._id
        }, {
            bidder: bidderList,
            price: priceList
        })
        .exec()
        .then((product) => {
            Member.findOne({
                    _id: bidder
                })
                .exec()
                .then((member) => {
                    if (!member) {
                        return res.status(404).json({
                            message: 'Member not found'
                        });
                    } else {
                        biddingList = member.biddingList;
                        biddingList.splice(biddingList.indexOf(product._id), 1);
                        Member.findByIdAndUpdate({
                                _id: bidder
                            }, {
                                biddingList: biddingList
                            })
                            .exec()
                            .then((member2) => {
                                return res.status(200).json({
                                    message: 'Success'
                                });
                            }).catch((err) => {
                                return res.status(500).json({
                                    message: err
                                })
                            })
                    }
                })
        }).catch((err) => {
            return res.status(500).json({
                message: err
            });
        })
}