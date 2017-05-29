var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// LO schema
//-----------------------------------------------
var categorySchema = new Schema({
    name: { type: String, required: true },
    timestamp: { type: Number, default: Date.now() },
    description: { type: String, required: false, default: null },
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
    urlMedia: { type: String, required: false, default: null }
});

// Compile schema
//-----------------------------------------------
mongoose.model('Category', categorySchema, 'Categories');