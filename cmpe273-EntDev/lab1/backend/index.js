//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

var config = require('./config');
var userController = require('./controllers/userController');
var eventController = require('./controllers/eventController');
var orderController = require('./controllers/orderController');
var restaurantController = require('./controllers/restaurantController');
var seacrhController = require('./controllers/seacrhController');
var menuController = require('./controllers/menuControllers');

var mysqlConnection = config.mysqlConnection;
var port = process.env.PORT || 3001 ;

app.use(bodyParser.json());

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

userController(app, mysqlConnection);
eventController(app, mysqlConnection);
orderController(app, mysqlConnection);
restaurantController(app, mysqlConnection);
seacrhController(app, mysqlConnection);
menuController(app, mysqlConnection);

//start your server on designated port or 3001
app.listen(port, () => {
    console.log("Server Listening on port ", port);
});