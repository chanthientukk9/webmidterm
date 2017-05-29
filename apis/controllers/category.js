var mongoose = require('mongoose');
var Category = mongoose.model('Category');

module.exports.getAllCategory = function(req, res, next) {
    Category.find({})
        .exec()
        .then((category) => {
            if (!category) {
                return res.status(404).json({
                    message: "Category not found"
                });
            } else {
                return res.status(200).json(category);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not get categoríes"
            });
        });
}

module.exports.getCategoryDetail = function(req, res, next) {
    Category.findById({
            categoryId: req.params.categoryId
        })
        .exec()
        .then((category) => {
            if (!category) {
                return res.status(404).json({
                    message: "Category not found"
                });
            } else {
                return res.status(200).json(category);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not get category"
            })
        });
}

module.exports.createCategory = function(req, res, next) {
    Category.create({
            name: req.body.name,
            description: req.body.description,
            parent: req.body.parent,
            urlMedia: req.body.urlMedia
        })
        .then((category) => {
            return res.status(200).json(category);
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not create new category"
            });
        });
}

module.exports.updateCategory = function(req, res, next) {
    Category.findByIdAndUpdate({
            _id: req.params.categoryId
        }, {
            name: req.body.name,
            description: req.body.description,
            parent: req.body.parent,
            urlMedia: req.body.urlMedia
        })
        .exec()
        .then((category) => {
            if (!category) {
                return res.status(404).json({
                    message: "Category not found"
                });
            } else {
                return res.status(200).json(category);
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not update category"
            });
        });
}

module.exports.deleteCategory = function(req, res, next) {
    Category.findByIdAndRemove({
            _id: req.params.categoryId
        })
        .exec()
        .then((category) => {
            if (!category) {
                return res.status(404).json({
                    message: "Category not found"
                });
            } else {
                return res.status(200).json({
                    message: "Success"
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: "Can not delete category"
            });
        });
}