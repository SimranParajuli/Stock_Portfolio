var mongoose = require('mongoose');
var stockSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    available_units: {
        type: Number,
        required: true
    },
    price_per_units: {
        type: Number,
        required: true
    },
    is_avaibalbe: {
        type : Boolean,
        default : true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Stock = module.exports = mongoose.model('stock', stockSchema);
module.exports.get = function (callback, limit) {
    Stock.find(callback).limit(limit);
}

module.exports.addStock = function(stock, callback) {
    Stock.create(stock, callback);
};