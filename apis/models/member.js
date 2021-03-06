var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// LO schema
//-----------------------------------------------
// var bidList = new Schema({
//     productId: { type: Schema.Types.ObjectId, ref: 'Product' },
//     timeStamp: { type: Number, required: false, default: Date.now() },
//     result: { type: Boolean, required: false, default: false }
// })

var memberSchema = new Schema({
    password: { type: String, required: true },
    name: { type: String, required: false },
    email: { type: String, required: true, default: null },
    grole: { type: Number, required: true, default: 2 },
    srole: { type: Number, required: false },
    phone: { type: String, required: false, default: null },
    birthday: { type: Number, required: false, default: null },
    avatar: { type: String, required: false, default: null },
    point: {
        good: { type: Number, default: 0 },
        total: { type: Number, default: 0 }
    },
    address: { type: String, required: false, default: null },
    wishList: [{ type: Schema.Types.ObjectId, ref: 'Products', default: null }],
    biddingList: [{ type: Schema.Types.ObjectId, ref: 'Products', default: null }],
    biddedList: [{ type: Schema.Types.ObjectId, ref: 'Products', default: null }],
    sellingList: [{ type: Schema.Types.ObjectId, ref: 'Products', default: null }],
    soldList: [{ type: Schema.Types.ObjectId, ref: 'Products', default: null }],
    timeStamp: { type: Number, required: false, default: Date.now() }
});



// Compile schema
//-----------------------------------------------
mongoose.model('Members', memberSchema, 'Members');