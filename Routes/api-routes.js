let router = require('express').Router();

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


module.exports = router;