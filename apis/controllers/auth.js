var mongoose = require('mongoose');
var memberModal = mongoose.model('Member');
var helpers = require('../modules/helpers.js');
var md5 = require('js-md5');
var jwt = require('../modules/jwt-helper.js');

module.exports.registerMember = function(req, res, next) {
    var body = req.body;

    if (!helpers.checkProperties(body, ['password', 'email'])) {
        return res.status(500).json({
            message: 'Infomation missed'
        });
    }
    body.password = md5(body.password);

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
            var newMember = new memberModal(body);
            newMember.save(function(err, member) {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(200).json({
                    message: 'Success'
                })
            })

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
        .exec()
        .then((profile) => {
            if (!profile) {
                return res.status(404).json({
                    message: 'Profile not found'
                });
            } else {
                return res.status(200).json(profile);
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not get profile'
            });
        })
}