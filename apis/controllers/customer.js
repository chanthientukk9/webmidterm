// var mongoose = require('mongoose');
// var Customers = mongoose.model('Customers');
var firebase = require('firebase-admin');
var customerRef = firebase.database().ref().child('customers');

module.exports.getAllCustomers = function(req, res, next) {
    var customers = [];
    customerRef.once('value', function(snapshot) {
        snapshot.forEach(function(element) {
            var data = {
                id: element.key,
                value: element.val()
            }
            customers.push(data);
        })
    }).then(function(){
        return res.status(200).json(customers);
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Cannot get customers'
        });
    });

    // Customers.find({})
    //     .exec()
    //     .then((customers) => {
    //         if (!customers) {
    //             return res.status(404).json({
    //                 message: "Customers not found"
    //             });
    //         } else {
    //             return res.status(200).json(customers);
    //         }
    //     })
    //     .catch((error) => {
    //         return res.status(500).json({
    //             message: "Can not get customers"
    //         });
    //     });
}

module.exports.getCustomers = function(req, res, next) {
    var customers = [];
    customerRef.orderByChild('status').equalTo(req.query.status).once('value', function(snapshot) {
        snapshot.forEach(function(element) {
            var data = {
                id: element.key,
                value: element.val()
            }
            customers.push(data);
        })
    }).then(function(){
        return res.status(200).json(customers);
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Cannot get customers'
        });
    });
    // Customers.find({
    //     status: req.params.status
    // })
    //     .exec()
    //     .then((customers) => {
    //         if (!customers) {
    //             return res.status(404).json({
    //                 message: "Customers not found"
    //             });
    //         } else {
    //             return res.status(200).json(customers);
    //         }
    //     })
    //     .catch((error) => {
    //         return res.status(500).json({
    //             message: "Can not get customers"
    //         });
    //     });
}


module.exports.getCustomerDetail = function(req, res, next) {
    var customer = {};
    customerRef.orderByKey().equalTo(req.params.customerId).once('value', function(snapshot) {
        snapshot.forEach(function(element) {
            var data = {
                id: element.key,
                value: element.val()
            }
            customer = data;
        })
    }).then(function(){
        return res.status(200).json(customer);
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Cannot get customers'
        });
    });
    // Customers.findOne({
    //         _id: req.params.customerId
    //     })
    //     .exec()
    //     .then((customer) => {
    //         if (!customer) {
    //             return res.status(404).json({
    //                 message: "Customer not found"
    //             });
    //         } else {
    //             return res.status(200).json(customer);
    //         }
    //     })
    //     .catch((error) => {
    //         return res.status(500).json({
    //             message: "Can not get customer"
    //         })
    //     });
}

module.exports.createCustomer = function(req, res, next) {
    var customerData = {
        address: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng,
        carType: req.body.carType,
        status: 'pending',
        driver: null,
        timestamp: Date.now()
    }
    var newCustomer = customerRef.push(customerData).then(function(customer) {
        return res.status(200).json({
            message: 'Create Success'
        })
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Can not create new customer'
        });
    });
    // Customers.create({
    //         address: req.body.address,
    //         carType: req.body.carType,
    //     })
    //     .then((customer) => {
    //         return res.status(200).json(customer);
    //     })
    //     .catch((error) => {
    //         return res.status(500).json({
    //             message: "Can not create new customer"
    //         });
    //     });
}

module.exports.updateCustomer = function(req, res, next) {
    var customerData = {
        address: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng,
        carType: req.body.carType,
        status: req.body.status,
        driver: req.body.driver,
        timestamp: req.body.timestamp
    };
    var updates = {};
    updates['/' + req.params.customerId] = customerData;
    return customerRef.update(updates).then(function(customer) {
        return res.status(200).json({
            id: req.params.customerId,
            value: customerData
        })
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Can not update customer'
        });
    });
    // Customers.findByIdAndUpdate({
    //         _id: req.params.customerId
    //     }, {
    //         status: req.body.status,
    //         driver: req.body.driver
    //     })
    //     .exec()
    //     .then((customer) => {
    //         if (!customer) {
    //             return res.status(404).json({
    //                 message: "Customer not found"
    //             });
    //         } else {
    //             return res.status(200).json(customer);
    //         }
    //     })
    //     .catch((error) => {
    //         return res.status(500).json({
    //             message: "Can not update customer"
    //         });
    //     });
}

module.exports.deleteCustomer = function(req, res, next) {

    customerRef.child(req.params.customerId).remove();

    // Customers.findByIdAndRemove({
    //         _id: req.params.customerId
    //     })
    //     .exec()
    //     .then((customer) => {
    //         if (!customer) {
    //             return res.status(404).json({
    //                 message: "Customer not found"
    //             });
    //         } else {
    //             return res.status(200).json({
    //                 message: "Success"
    //             });
    //         }
    //     })
    //     .catch((error) => {
    //         return res.status(500).json({
    //             message: "Can not delete customer"
    //         });
    //     });
}