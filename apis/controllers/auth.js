var mongoose = require('mongoose');
var memberModal = mongoose.model('Members');
var helpers = require('../modules/helpers.js');
var md5 = require('js-md5');
var jwt = require('../modules/jwt-helper.js');
var upgradeWaiting = 909;

module.exports.registerMember = function(req, res, next) {
    var body = req.body;

    if (!helpers.checkProperties(body, ['password', 'email'])) {
        return res.status(500).json({
            message: 'Infomation missed'
        });
    }
    body.password = md5(body.password);
    // body.point =
    memberModal.findOne({
            email: body.email
        })
        .exec()
        .then((email) => {
            if (email) {
                return res.status(500).json({
                    message: 'Email exist'
                });
            }
            memberModal.create(body).then((member) => {
                    return res.status(200).json(member);
                })
                .catch((err) => {
                    return res.status(500).json({
                        message: "Err",
                        detail: err
                    });
                })
                // var newMember = new memberModal(body);
                // newMember.save(function(err, member) {
                //     if (err) {
                //         return res.status(500).json(err);
                //     }
                //     return res.status(200).json({
                //         message: 'Success'
                //     })
                // })

        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not create account'
            })
        })
}

module.exports.login = function(req, res, next) {
    var body = req.body;

    if (!helpers.checkProperties(body, ['password', 'email'])) {
        return res.status(500).json({
            message: 'Information missed'
        });
    }

    memberModal.findOne({
            email: body.email,
            password: md5(body.password)
        })
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(500).json({
                    message: 'Wrong email or password'
                });
            } else {
                var token = jwt.getToken({
                    email: member.email,
                    _id: member._id
                });
                return res.json({
                    message: 'success',
                    data: member,
                    token: token
                })
            }
        })
}

module.exports.getProfile = function(req, res, next) {
    console.log(req.userData);
    console.log(req.headers.authorization);
    if (!req.userData) {
        return res.status(401).json({
            message: 'Can not get profile'
        });
    }
    memberModal.findOne({
            _id: req.userData._id
        })
        .populate({ path: 'wishList', model: 'Products' })
        .populate({ path: 'biddingList', model: 'Products' })
        .populate({ path: 'biddedList', model: 'Products' })
        .exec()
        .then((profile) => {
            if (!profile) {
                return res.status(404).json({
                    message: 'Profile not found'
                });
            } else {
                profile.password = undefined;
                return res.status(200).json(profile);
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not get profile'
            });
        })
}

module.exports.upgradeMember = function(req, res, next) {
    memberModal.findOne({
            _id: req.userData._id
        })
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: 'Member not found'
                });
            } else {
                memberModal.findByIdAndUpdate({
                        _id: member._id
                    }, {
                        srole: upgradeWaiting
                    })
                    .exec()
                    .then((member) => {
                        return res.status(200).json({
                            message: "success"
                        });
                    }).catch((err) => {
                        return res.status(500).json({
                            message: 'Can not upgrade'
                        });
                    })
            }
        })
}

module.exports.allowUpgrade = function(req, res, next) {
    memberModal.findByIdAndUpdate({
            _id: req.body._id,
            srole: 909
        }, {
            srole: 1
        })
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: "Member not found"
                });
            } else {
                return res.status(200).json({
                    message: "Upgrade Success"
                });
            }
        }).catch((err) => {
            return res.status(500).json({
                message: "Error"
            });
        })
}