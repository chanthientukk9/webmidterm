var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// LO schema
//-----------------------------------------------
var productAttribute = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    content: { type: String, default: null },
    contents: { type: [String], default: null }
});

var media = new Schema({
    url: { type: String, required: true }
})

var productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false, default: null },
    price: { type: [Number], required: true },
    urlMedia: { type: [media], required: true },
    status: { type: String, default: "notvalid" },
    attributes: { type: [productAttribute], default: null }
});



// Compile schema
//-----------------------------------------------
mongoose.model('Product', productSchema, 'Products');