Stock = require('../Models/stockModel');
const bodyParser=require('body-parser')
const {parse}=require('querystring')


exports.index = function (req, res) {
    Stock.get(function (err, stock) {
        if (err) {
            res.json({
                status: "error",
                message: err,
             });
        }
        res.json({
            status: "success",
            message: "stocks retrieved successfully",
            data: stock
        });
    });
};


exports.new = async function (req, res) {
    const stock = new Stock({
        name: req.body.name,
        available_units: req.body.available_units,
        price_per_units: req.body.price_per_units
    });
    
    try{
        const savedStock =await stock.save();
        res.send(savedStock);
    }catch (err){
        res.status(400).send(err);
    }
};



exports.view = function (req, res) {
    Stock.findById(req.params.stock_id, function (err, stock) {
        if (err)
            res.send(err);
        res.json({
            message: 'stock details loading..',
            data: stock
        });
    });
};

exports.update = function (req, res) {
Stock.findById(req.params.stock_id, function (err, stock) {
        if (err)
            res.send(err);
            stock.name = req.body.name ? req.body.name : stock.stock_name;
            stock.available_units = req.body.available_units;
            stock.price_per_unit = req.body.price_per_unit;

        stock.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'stock Info updated',
                data: stock
            });
        });
    });
};
