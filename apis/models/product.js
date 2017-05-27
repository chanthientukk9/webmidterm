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
});

var attributes = new Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    data: { type: String, required: true }
});

var productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false, default: null },
    price: { type: [Number], required: true },
    urlMedia: { type: [media], required: true },
    status: { type: String, default: "notvalid" },
    attributes: { type: [attributes], default: null },
    seller: { type: Schema.Types.ObjectId, ref: "Member" },
    location: { type: String, required: false, default: null },
    startDate: { type: Number, required: false, default: Date.now() },
    endDate: { type: Number, required: false, default: Date.now() }
});



// Compile schema
//-----------------------------------------------
mongoose.model('Product', productSchema, 'Products');