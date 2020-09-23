//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config');
var userController = require('./controllers/userController');

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

var Users = [{
    username: "admin",
    password: "admin"
}]

userController(app, config.mysqlConnection);

//Route to handle Post Request Call
app.post('/user', function (req, res) {
    console.log("Inside Login Post Request");
    console.log("Req Body : ", req.body);

    let isUser = false;

    Users.filter(function (user) {
        if (user.username === req.body.emailID && user.password === req.body.password) {
            res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Successful Login");
            isUser = true;
        }
    });

    if (!isUser) {
        console.log("\t","Invalid Credentials")
        res.writeHead(401, {
            'Content-Type': 'text/plain'
        })
        res.end("Your ID or PW is wrong ! Try Again.")
    }
});

//start your server on port 3001
app.listen(port, () => {
    console.log("Server Listening on port 3001");
});