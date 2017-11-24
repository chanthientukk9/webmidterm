// var mongoose = require('mongoose');
// var Customers = mongoose.model('Customers');
var firebase = require('firebase-admin');

module.exports.getAllCustomers = function(req, res, next) {
    Customers.find({})
        .exec()
        .then((customers) => {
            if (!customers) {
                return res.status(404).json({
                    message: "Customers not found"
                });
            } else {
                return res.status(200).json(customers);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not get customers"
            });
        });
}

module.exports.getPendingCustomers = function(req, res, next) {
    Customers.find({
        status: 'pending'
    })
        .exec()
        .then((customers) => {
            if (!customers) {
                return res.status(404).json({
                    message: "Customers not found"
                });
            } else {
                return res.status(200).json(customers);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not get customers"
            });
        });
}

module.exports.getWaitingCustomers = function(req, res, next) {
    Customers.find({
        status: 'waiting'
    })
        .exec()
        .then((customers) => {
            if (!customers) {
                return res.status(404).json({
                    message: "Customers not found"
                });
            } else {
                return res.status(200).json(customers);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not get customers"
            });
        });
}

module.exports.getMovingCustomers = function(req, res, next) {
    Customers.find({
        status: 'moving'
    })
        .exec()
        .then((customers) => {
            if (!customers) {
                return res.status(404).json({
                    message: "Customers not found"
                });
            } else {
                return res.status(200).json(customers);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not get customers"
            });
        });
}

module.exports.getDoneCustomers = function(req, res, next) {
    Customers.find({
        status: 'done'
    })
        .exec()
        .then((customers) => {
            if (!customers) {
                return res.status(404).json({
                    message: "Customers not found"
                });
            } else {
                return res.status(200).json(customers);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not get customers"
            });
        });
}


module.exports.getCustomerDetail = function(req, res, next) {
    Customers.findOne({
            _id: req.params.customerId
        })
        .exec()
        .then((customer) => {
            if (!customer) {
                return res.status(404).json({
                    message: "Customer not found"
                });
            } else {
                return res.status(200).json(customer);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not get customer"
            })
        });
}

module.exports.createCustomer = function(req, res, next) {
    Customers.create({
            address: req.body.address,
            carType: req.body.carType,
        })
        .then((customer) => {
            return res.status(200).json(customer);
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not create new customer"
            });
        });
}

module.exports.updateCustomer = function(req, res, next) {
    Customers.findByIdAndUpdate({
            _id: req.params.customerId
        }, {
            status: req.body.status,
            driver: req.body.driver
        })
        .exec()
        .then((customer) => {
            if (!customer) {
                return res.status(404).json({
                    message: "Customer not found"
                });
            } else {
                return res.status(200).json(customer);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not update customer"
            });
        });
}

module.exports.deleteCustomer = function(req, res, next) {
    Customers.findByIdAndRemove({
            _id: req.params.customerId
        })
        .exec()
        .then((customer) => {
            if (!customer) {
                return res.status(404).json({
                    message: "Customer not found"
                });
            } else {
                return res.status(200).json({
                    message: "Success"
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not delete customer"
            });
        });
}