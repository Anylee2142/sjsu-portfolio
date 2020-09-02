//import express module 
var express = require('express');
//create an express app
var app = express();
//require express middleware body-parser
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');
var cookieParser = require('cookie-parser');

//set the view engine to ejs
app.set('view engine', 'ejs');
//set the directory of views
app.set('views', './views');
//specify the path of static directory
app.use(express.static(__dirname + '/public'));

//use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//use cookie parser to parse request headers
app.use(cookieParser());
//use session to store user data between HTTP requests
app.use(session({
    secret: 'cmpe_273_secure_string',
    resave: false,
    saveUninitialized: true
}));

//Only user allowed is admin
var Users = [{
    "username": "admin",
    "password": "1234"
}];

//By Default we have 3 books
var books = [
    { "BookID": "1", "Title": "Outlier", "Author": "Malcomm Gladwell" },
    { "BookID": "2", "Title": "Die Kunst ueber Geld nachzudenken", "Author": "Andre Kostolany" },
    { "BookID": "3", "Title": "Cosmos", "Author": "Carl Sagan" }
]

module.exports = {
    Users: () => Users,
    books: () => books,
    setBooks: (newBooks) => { books = newBooks },
} ;

//route to root
app.get('/', function (req, res) {
    //check if user session exits
    if (req.session.user) {
        res.redirect("/home");
    } else
        res.render('login', {
            ErrorMessage: ""
        });
});

// Load Controllers for API
var loginController = require('./controllers/loginController');
loginController(app);
var homeController = require('./controllers/homeController');
homeController(app);
var createController = require('./controllers/createController');
createController(app);
var deleteController = require('./controllers/deleteController');
deleteController(app);

var server = app.listen(3000, function () {
    console.log("Server listening on port 3000");
});
