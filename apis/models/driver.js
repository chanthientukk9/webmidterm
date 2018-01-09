var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// LO schema
//-----------------------------------------------
var driverSchema = new Schema({
    password: { type: String, required: true },
    name: { type: String, required: false },
    email: { type: String, required: true, default: null },
    lat: { type: Number },
    lng: { type: Number },
    carType: { type: Number, required: true },
    status: { type: String, default: 'waiting'},
    customer: { type: Schema.Types.ObjectId, ref: 'Customers'},
    timestamp: { type: Number, default: Date.now() },
    
});

// Compile schema
//-----------------------------------------------
mongoose.model('Drivers', driverSchema, 'Drivers');