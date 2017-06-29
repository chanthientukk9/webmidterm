var jwt = require('./jwt-helper');
var mongoose = require('mongoose');
var memberModel = mongoose.model('Member');

module.exports = function(right) {

    return function(req, res, next) {
        console.log("Hahahaaaaa");
        var token = "";
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }

        var data = jwt.checkToken(token);

        req.userData = data.data;

        if (!data) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }

        memberModel.findOne({
                _id: data.data._id
            })
            .exec()
            .then((member) => {
                if (!member) {
                    return res.status(401).json({
                        message: 'Invalid token'
                    });
                } else {
                    if (right == 100) {
                        if (member.srole == 1 || member.srole == 1001) {
                            return next();
                        } else {
                            return res.status(401).json({
                                message: 'You do not have right'
                            })
                        }
                    } else if (right == 1001) {
                        if (member.srole == right) {
                            return next();
                        } else {
                            return res.status(401).json({
                                message: 'You do not have right'
                            });
                        }
                    } else {
                        if (member.grole != right && right.srole != right) {
                            return res.status(401).json({
                                message: 'You do not have right'
                            })
                        } else {
                            return next();
                        }
                    }
                }
            })
    }
}