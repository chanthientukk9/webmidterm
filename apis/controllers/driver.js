var mongoose = require('mongoose');
var Drivers = mongoose.model('Drivers');

module.exports.getAllDrivers = function(req, res, next) {
    Drivers.find({})
        .exec()
        .then((drivers) => {
            if (!drivers) {
                return res.status(404).json({
                    message: "Drivers not found"
                });
            } else {
                return res.status(200).json(drivers);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not get drivers"
            });
        });
}

module.exports.getPickingDrivers = function(req, res, next) {
    Drivers.find({
        status: 'picking'
    })
        .exec()
        .then((drivers) => {
            if (!drivers) {
                return res.status(404).json({
                    message: "Drivers not found"
                });
            } else {
                return res.status(200).json(drivers);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not get drivers"
            });
        });
}

module.exports.getWaitingDrivers = function(req, res, next) {
    Drivers.find({
        status: 'waiting'
    })
        .exec()
        .then((drivers) => {
            if (!drivers) {
                return res.status(404).json({
                    message: "Drivers not found"
                });
            } else {
                return res.status(200).json(drivers);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not get drivers"
            });
        });
}

module.exports.getMovingDrivers = function(req, res, next) {
    Drivers.find({
        status: 'moving'
    })
        .exec()
        .then((drivers) => {
            if (!drivers) {
                return res.status(404).json({
                    message: "Drivers not found"
                });
            } else {
                return res.status(200).json(drivers);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not get drivers"
            });
        });
}


module.exports.getDriverDetail = function(req, res, next) {
    Drivers.findOne({
            _id: req.params.driverId
        })
        .exec()
        .then((driver) => {
            if (!driver) {
                return res.status(404).json({
                    message: "Driver not found"
                });
            } else {
                return res.status(200).json(driver);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not get driver"
            })
        });
}

module.exports.createDriver = function(req, res, next) {
    Drivers.create({
            carType: req.body.carType,
        })
        .then((driver) => {
            return res.status(200).json(driver);
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not create new driver"
            });
        });
}

module.exports.updateDriver = function(req, res, next) {
    Drivers.findByIdAndUpdate({
            _id: req.params.driverId
        }, {
            status: req.body.status,
            customer: req.body.customer
        })
        .exec()
        .then((driver) => {
            if (!driver) {
                return res.status(404).json({
                    message: "Driver not found"
                });
            } else {
                return res.status(200).json(driver);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not update driver"
            });
        });
}

module.exports.deleteDriver = function(req, res, next) {
    Category.findByIdAndRemove({
            _id: req.params.driverId
        })
        .exec()
        .then((driver) => {
            if (!driver) {
                return res.status(404).json({
                    message: "Driver not found"
                });
            } else {
                return res.status(200).json({
                    message: "Success"
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not delete driver"
            });
        });
}