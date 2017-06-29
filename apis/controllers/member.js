var mongoose = require('mongoose');
var Member = mongoose.model('Members');

module.exports.getAllMember = function(req, res, next) {
    Member.find({})
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: "Member not found"
                })
            } else {
                member.password = undefined;
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
                member.password = undefined;
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
            phone: req.body.phone,
            birthday: req.body.birthday,
            avatar: req.body.avatar,
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

module.exports.updateWishList = function(req, res, next) {
    Member.findByIdAndUpdate({
            _id: req.userData._id
        }, {
            wishList: req.body.wishList
        })
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: 'Member not found'
                });
            } else {
                return res.status(200).json({
                    wishList: member.wishList
                });
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not update wish list'
            })
        })
}

module.exports.getWishList = function(req, res, next) {
    Member.findOne({
            _id: req.userData._id
        })
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: 'Member not found'
                });
            } else {
                return res.status(200).json({
                    wishList: member.wishList
                });
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not get wish list'
            })
        })
}

// module.exports.getWishListDetail = function(req, res, next) {
//     Member.findOne({
//             _id: req.userData._id
//         })
//         .populate({ path: 'wishList', model: 'Products' })
//         .exec()
//         .then((member) => {
//             if (!member) {
//                 return res.status(404).json({
//                     message: 'Member not found'
//                 });
//             } else {
//                 return res.status(200).json({
//                     wishList: member.wishList
//                 });
//             }
//         }).catch((err) => {
//             return res.status(500).json({
//                 message: 'Can not get wish list'
//             })
//         })
// }

module.exports.getBiddingList = function(req, res, next) {
    Member.findOne({
            _id: req.userData._id
        })
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: 'Member not found'
                });
            } else {
                return res.status(200).json({
                    biddingList: member.biddingList
                });
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not get bidding list'
            });
        })
}

module.exports.updateBiddingList = function(req, res, next) {
    Member.findByIdAndUpdate({
            _id: req.userData._id
        }, {
            biddingList: req.body.biddingList
        })
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: 'Member not found'
                });
            } else {
                return res.status(200).json({
                    biddingList: member.biddingList
                });
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not get bidding list'
            });
        })
}

module.exports.getBiddedList = function(req, res, next) {
    Member.findOne({
            _id: req.userData._id
        })
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: 'Member not found'
                });
            } else {
                return res.status(200).json({
                    biddedList: member.biddedList
                });
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not get bidding list'
            });
        })
}

module.exports.updateBiddedList = function(req, res, next) {
    Member.findByIdAndUpdate({
            _id: req.userData._id
        }, {
            biddedList: req.body.biddedList
        })
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: 'Member not found'
                });
            } else {
                return res.status(200).json({
                    biddedList: member.biddedList
                });
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not get bidded list'
            });
        })
}


module.exports.getsellingList = function(req, res, next) {
    Member.findOne({
            _id: req.userData._id
        })
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: 'Member not found'
                });
            } else {
                return res.status(200).json({
                    biddedList: member.biddedList
                });
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not get bidding list'
            });
        })
}

module.exports.updateBiddedList = function(req, res, next) {
    Member.findByIdAndUpdate({
            _id: req.userData._id
        }, {
            biddedList: req.body.biddedList
        })
        .exec()
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    message: 'Member not found'
                });
            } else {
                return res.status(200).json({
                    biddedList: member.biddedList
                });
            }
        }).catch((err) => {
            return res.status(500).json({
                message: 'Can not get bidded list'
            });
        })
}