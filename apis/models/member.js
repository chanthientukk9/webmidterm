var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// LO schema
//-----------------------------------------------
var bidList = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    timeStamp: { type: Number, required: false, default: Date.now() },
    result: { type: Boolean, required: false, default: false }
})

var point = new Schema({
    good: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 }
})

var memberSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: false, default: null },
    phone: { type: String, required: false, default: null },
    birthday: { type: Number, required: false, default: null },
    avatar: { type: String, required: false, default: null },
    point: { type: point, required: true },
    address: { type: String, required: false, default: null },
    wishList: { type: Schema.Types.ObjectId, ref: 'Product' },
    biddingList: { type: bidList, required: false, default: null },
    bidedList: { type: bidList, required: false, default: null }
});



// Compile schema
//-----------------------------------------------
mongoose.model('Member', memberSchema, 'Members');