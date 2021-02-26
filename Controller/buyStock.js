const userStock = require("../Models/userStock");

Stock = require("../Models/stockModel");
userStock= require("../Models/userStock");

 function buyStock(req, res) {
    Stock.get(function (err, stock) {
        if (err) {
            res.json({
                status: "error",
                message: err,
             });
        }


        db.collection('stocks').find({}).toArray(function (err, stock) {
        console.log("Available Stocks: " + stock);
            
            stock.name = req.body.name,
            stock.available_units = req.body.available_units,
            stock.price_per_units = req.body.price_per_units

        });
        
        try{
            const savedUserStock =await userStock.save();
            res.send(savedUserStock);
        }catch (err){
            res.status(400).send(err);
        }
           
        })};
    


        
        
