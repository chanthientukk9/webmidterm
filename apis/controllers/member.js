var mongoose = require('mongoose');
var Member = mongoose.model('Member');

module.exports.getAllMember = function(req, res, next) {
    Member.find({})
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: "Member not found"
                })
            } else {
                return res.status(200).json(member);
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Cannot get member list"
            })
        });
}

module.exports.getMemberDetail = function(req, res, next) {
    Member.findById(req.params.memberId)
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: "Member not found"
                })
            } else {
                return res.status(200).json(member);
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Cannot get member"
            })
        });
}

module.exports.createMember = function(req, res, next) {
    Member.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            birthday: req.body.birthday,
            avatar: req.body.avatar,
            point: req.body.point,
            address: req.body.address
        })
        .then((member) => {
            return res.status(200).json(member);
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Cannot create member"
            })
        });
}

module.exports.updateMember = function(req, res, next) {
    Member.findByIdAndUpdate({
            _id: req.params.memberId
        }, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            birthday: req.body.birthday,
            avatar: req.body.avatar,
            point: rea.body.point,
            address: req.body.address
        })
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: "Member not found"
                })
            } else {
                return res.status(200).json(member);
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Cannot update member"
            })
        });
}

module.exports.deleteMember = function(req, res, next) {
    Member.findByIdAndRemove({
            _id: req.params.memberId
        })
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: "Member not found"
                })
            } else {
                return res.status(200).json({
                    message: "Success"
                })
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Cannot delete member"
            })
        });
}