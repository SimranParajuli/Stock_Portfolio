let router = require('express').Router();
const path = require('path');
let express = require('express');
let app = express();
app.set('view-engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
const verifyToken = require('../Middlewares/verifyToken');


router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

var stockController = require('../Controller/stockController');
var userController = require('../Controller/userController');


router.route('/stock')
    .get(stockController.index)
    .post(stockController.new);
    
router.route('/stock/:stock_id')
    .get(stockController.view);

router.route('/user/register')
    .post(userController.new);
    
router.route('/user/login')
    .post(userController.view);

router.get('/user/login',function(req,res){
   res.render('login.html');
    });

router.get('/user/register',function(req,res){
    res.render('register.html');
    });

router.get('/home', verifyToken, (req, res) => {
   db.collection('stocks').find({}).toArray(function (err, result) {
        console.log("Available Stocks: " + result);
        res.render('home.ejs', {
            stock :result
        });
        });
         
         });


module.exports = router;