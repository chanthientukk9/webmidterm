var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// LO schema
//-----------------------------------------------

var memberSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: false, default: null },
    phone: { type: String, required: false, default: null },
    birthday: { type: Date, required: false, default: null },
    avatar: { type: String, required: false, default: null },
    point: { type: Number, required: false, default: 0 }
});



// Compile schema
//-----------------------------------------------
mongoose.model('Member', memberSchema, 'Members');