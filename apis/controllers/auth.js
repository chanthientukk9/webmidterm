var mongoose = require('mongoose');
var memberModal = mongoose.model('Member');
var helpers = require('../modules/helpers.js');
var md5 = require('js-md5');

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