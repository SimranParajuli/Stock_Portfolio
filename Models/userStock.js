var mongoose = require('mongoose');
var userStockSchema = mongoose.Schema({
    user_id: [{ 
        type: Schema.Types.ObjectId, ref: 'user'
     }],
    stock_id: [{ 
        type: Schema.Types.ObjectId, ref: 'stock'
     }],
    name: {
        type: String,
        required: true
    },
    available_stock: {
        type: Number,
        required: true
    },
    price_per_unit: {
        type: Number,
        required: true
    },
});

var userStock = module.exports = mongoose.model('userStock', userStockSchema);
module.exports.get = function (callback, limit) {
    userStock.find(callback).limit(limit);
}