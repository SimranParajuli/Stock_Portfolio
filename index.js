let express = require('express')
let app = express();
app.set('view-engine', 'ejs');
let apiRoutes = require("./api-routes")



const verifyToken = require('./verifyToken');

var port = process.env.PORT || 8080;
app.listen(port, function () {
   console.log("Running RestHub on port " + port);
});



let bodyParser = require('body-parser');
let mongoose = require('mongoose');
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());
app.use('/api', apiRoutes);
mongoose.connect('mongodb://localhost:27017/stockDB', { useNewUrlParser: true});
var db = mongoose.connection;


app.get('/home', verifyToken, (req, res) => {
   
   db.collection('stocks').find({}).toArray(function (err, result) {
      console.log("Available Stocks: " + result);
   res.render('home.ejs', {
      stock :result
   });
});

});
