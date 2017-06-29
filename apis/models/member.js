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
    password: { type: String, required: true },
    name: { type: String, required: false },
    email: { type: String, required: true, default: null },
    grole: { type: Number, required: true, default: 2 },
    srole: { type: Number, required: false },
    phone: { type: String, required: false, default: null },
    birthday: { type: Number, required: false, default: null },
    avatar: { type: String, required: false, default: null },
    point: { type: point, required: false },
    address: { type: String, required: false, default: null },
    wishList: { type: [Schema.Types.ObjectId], ref: 'Product', default: null },
    biddingList: { type: [bidList], required: false, default: null },
    bidedList: { type: [bidList], required: false, default: null },
    timeStamp: { type: Number, required: false, default: Date.now() }
});



// Compile schema
//-----------------------------------------------
mongoose.model('Member', memberSchema, 'Members');