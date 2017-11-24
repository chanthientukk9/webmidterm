var firebase = require('firebase-admin');
var driverRef = firebase.database().ref().child('drivers');

module.exports.getAllDrivers = function(req, res, next) {
    var drivers = [];
    driverRef.once('value', function(snapshot) {
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
        status: 'pending',
        customer: null,
        timestamp: Date.now()
    }
    var newDriver = driverRef.push(driverData).then(function(driver) {
        return res.status(200).json(driver)
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Can not create new driver'
        });
    });
}

module.exports.updateDriver = function(req, res, next) {
    var driverData = {
        status: req.body.status,
        customer: req.body.customer
    };
    var updates = {};
    updates['/drivers/' + req.params.driverId] = driverData;
    return driverRef.update(updates).then(function(driver) {
        return res.status(200).json(driver)
    }).catch(function(err) {
        return res.status(500).json({
            message: 'Can not update driver'
        });
    });
}

module.exports.deleteDriver = function(req, res, next) {
    driverRef.child(req.params.driverId).remove();
}