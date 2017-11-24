var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// LO schema
//-----------------------------------------------
var customerSchema = new Schema({
    address: { type: String, required: true },
    lat: { type: Number },
    lng: { type: Number },
    carType: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    driver: { type: Schema.Types.ObjectId, ref: 'Drivers' },
    timestamp: { type: Number, default: Date.now() },
});

// Compile schema
//-----------------------------------------------
mongoose.model('Customers', customerSchema, 'Customers');