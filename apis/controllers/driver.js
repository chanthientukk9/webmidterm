var firebase = require('firebase-admin');
var driverRef = firebase.database().ref().child('drivers');
var customerRef = firebase.database().ref().child('customers');

const RADIAN = 0.015; // 0.015
var helpers = require('../modules/helpers.js');
var md5 = require('js-md5');
var jwt = require('../modules/jwt-helper.js');

module.exports.login = function(req, res, next) {
    var body = req.body;

    if (!helpers.checkProperties(body, ['password', 'email'])) {
        return res.status(500).json({
            message: 'Information missed'
        });
    }

    var drivers = [];
    driverRef.once('value', function(snapshot) {
        snapshot.forEach(function(element) {
            var data = {
                id: element.key,
                value: element.val()
            }
            data.value.grole = 2;
            data.value.srole = null;
            drivers.push(data);
        });
    }).then(function(){
        let index = null;
        for(var i = 0; i < drivers.length; i++) {
            if(drivers[i].value.password == md5(req.body.password) && drivers[i].value.email == req.body.email) {
                var token = jwt.getToken({
                    email: drivers[i].value.email,
                    _id: drivers[i].id
                });
                index = drivers[i].value.password;
                return res.status(200).json({
                    message: 'success',
                    data: drivers[i],
                    token: token
                })
            }
        }
        return res.status(500).json({
            message: 'Wrong email or password',
        });
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Error happened'
        });
    });
}

module.exports.getAllDrivers = function(req, res, next) {
    var drivers = [];
    driverRef.once('value', function(snapshot) {
        snapshot.forEach(function(element) {
            var data = {
                id: element.key,
                value: element.val()
            }
            data.value.password = null;
            drivers.push(data);
        })
    }).then(function(){
        return res.status(200).json(drivers);
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Cannot get drivers'
        });
    });
}

module.exports.getDrivers = function(req, res, next) {
    var drivers = [];
    driverRef.orderByChild('status').equalTo(req.query.status).once('value', function(snapshot) {
        snapshot.forEach(function(element) {
            var data = {
                id: element.key,
                value: element.val()
            }
            drivers.push(data);
        })
    }).then(function(){
        return res.status(200).json(drivers);
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Cannot get drivers'
        });
    });
}

module.exports.getProfile = function(req, res, next) {
    var driver = {};
    if (!req.userData) {
        return res.status(401).json({
            message: 'Can not get profile'
        });
    }
    driverRef.orderByKey().equalTo(req.userData._id).once('value', function(snapshot) {
        snapshot.forEach(function(element) {
            var data = {
                id: element.key,
                value: element.val()
            }
            data.value.password = null;
            driver = data;
        })
    }).then(function(){
        return res.status(200).json(driver);
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Cannot get driver'
        });
    });
}

module.exports.getDriverDetail = function(req, res, next) {
    var driver = {};
    driverRef.orderByKey().equalTo(req.params.driverId).once('value', function(snapshot) {
        snapshot.forEach(function(element) {
            var data = {
                id: element.key,
                value: element.val()
            }
            driver = data;
        })
    }).then(function(){
        return res.status(200).json(driver);
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Cannot get driver'
        });
    });
}

module.exports.createDriver = function(req, res, next) {
    var driverData = {
        lat: req.body.lat,
        lng: req.body.lng,
        carType: req.body.carType,
        status: 'waiting',
        customer: null,
        timestamp: Date.now()
    }
    var newDriver = driverRef.push(driverData).then(function(driver) {
        return res.status(200).json({
            message: 'Create Success'
        })
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Can not create new driver'
        });
    });
}

module.exports.replyInvitation = function(req, res, next) {
    var driverData = {
        lat: req.body.lat,
        lng: req.body.lng,
        carType: req.body.carType,
        status: req.body.status,
        customer: req.body.customer,
        timestamp: req.body.timestamp
    };
    if(driverData.status === 'deny') {
        let customer = {};
        customerRef.orderByKey().equalTo(req.body.customer).once('value', function(snapshot) {
            snapshot.forEach(function(element) {
                var data = {
                    id: element.key,
                    value: element.val()
                }
                customer = data;
            })
        }).then(function(){
            var customerData = {
                address: customer.value.address,
                lat: customer.value.lat,
                lng: customer.value.lng,
                carType: customer.value.carType,
                status: 'pending',
                driver: customer.value.driver,
                timestamp: customer.value.timestamp
            };
            var updates = {};
            updates['/' + customer.id] = customerData;
            return customerRef.update(updates).then(function(customer) {
                var updates = {};
                driverData.status = 'waiting';
                driverRef.orderByKey().equalTo(req.userData._id).once('value', function(snapshot) {
                    snapshot.forEach(function(element) {
                        var data = {
                            id: element.key,
                            value: element.val()
                        }
                        driverData.password = data.value.password;
                        driverData.email = data.value.email;
                    })
                }).then(function(){
                    updates['/' + req.userData._id] = driverData;
                    driverRef.update(updates).then(function(driver) {
                    return res.status(200).json({
                        message: 'Success'
                    })
                    }).catch(function(err) {
                        return res.status(500).json({
                            message: 'Can not update driver'
                        });
                    });
                }).catch(function(err) {
                    return res.status(500).json({
                        message: 'Cannot get driver'
                    });
                });
            }).catch(function(err) {
                return res.status(500).json({
                    message: 'Can not update customer'
                });
            });
        }).catch(function(err) {
            return res.status(500).json({
                message: 'Cannot get customers'
            });
        });
    } else {
        driverData.status = 'picking'
        driverRef.orderByKey().equalTo(req.userData._id).once('value', function(snapshot) {
            snapshot.forEach(function(element) {
                var data = {
                    id: element.key,
                    value: element.val()
                }
                driverData.password = data.value.password;
                driverData.email = data.value.email;
            })
        }).then(function(){
            var updates = {};
            updates['/' + req.userData._id] = driverData;
            driverRef.update(updates).then(function(driver) {
                return res.status(200).json({
                    message: 'Success'
                })
            }).catch(function(err) {
                return res.status(500).json({
                    message: 'Can not update driver'
                });
            });
        }).catch(function(err) {
            return res.status(500).json({
                message: 'Can not update driver'
            });
        });
    }
}

module.exports.updateDriver = function(req, res, next) {
    var driverData = {
        lat: req.body.lat,
        lng: req.body.lng,
        carType: req.body.carType,
        status: req.body.status,
        customer: req.body.customer,
        timestamp: req.body.timestamp
    };
    driverRef.orderByKey().equalTo(req.userData._id).once('value', function(snapshot) {
        snapshot.forEach(function(element) {
            var data = {
                id: element.key,
                value: element.val()
            }
            driverData.password = data.value.password;
            driverData.email = data.value.email;
        })
    }).then(function(){
        var updates = {};
        updates['/' + req.userData._id] = driverData;
        driverRef.update(updates).then(function(driver) {
            return res.status(200).json({
                id: req.params.driverId,
                value: driverData
            })
        }).catch(function(err) {
            return res.status(500).json({
                message: 'Can not update driver'
            });
        });
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Can not update driver'
        });
    });
}

module.exports.deleteDriver = function(req, res, next) {
    driverRef.child(req.params.driverId).remove();
}

module.exports.nearDrivers = function(req, res, next) {
    var drivers = [];
    var customer = {
        lat: req.body.lat,
        lng: req.body.lng
    }
    driverRef.once('value', function(snapshot) {
        snapshot.forEach(function(element) {
            var data = {
                id: element.key,
                value: element.val()
            }
            var distance = Math.sqrt(Math.pow(customer.lat - element.val().lat, 2) + Math.pow(customer.lng - element.val().lng, 2));
            if(distance < RADIAN && element.val().status == 'waiting') {
                drivers.push(data);            
            }
        })
    }).then(function(){
        return res.status(200).json(drivers);
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Cannot get drivers'
        });
    });
}