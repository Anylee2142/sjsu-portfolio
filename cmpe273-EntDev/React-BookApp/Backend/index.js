//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

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

var books = [
    { "BookID": "1", "Title": "Book 1", "Author": "Author 1" },
    { "BookID": "2", "Title": "Book 2", "Author": "Author 2" },
    { "BookID": "3", "Title": "Book 3", "Author": "Author 3" },
    { "BookID": "4", "Title": "Book 4", "Author": "Author 4" }
]

//Route to handle Post Request Call
app.post('/login', function (req, res) {
    console.log("Inside Login Post Request");
    console.log("Req Body : ", req.body);

    let isUser = false;

    Users.filter(function (user) {
        if (user.username === req.body.username && user.password === req.body.password) {
            res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
            req.session.user = user;
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

//Route to get All Books when user visits the Home Page
app.get('/home', function (req, res) {
    console.log("Inside Home Login");
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    console.log("Books : ", JSON.stringify(books));
    res.end(JSON.stringify(books));
})

app.post('/create', function (req, res) {
    console.log("Inside Create Post Request");
    let { BookID, Title, Author } = req.body;
    let isDuplicated = false;

    console.log("Request Body: ", req.body);
    if (books.map(x => x["BookID"]).includes(BookID)) {
        isDuplicated = true;
        res.writeHead(409, {
            'Content-Type': 'text/plain'
        })
        res.end("The BookID already exists! Try with another ID!");
    }

    if (!isDuplicated) {
        books.push({
            "BookID": BookID,
            "Title": Title,
            "Author": Author
        });
        books.sort((a, b) => a.BookID < b.BookID ? -1 : 1);
        console.log(books);
        console.log("Add the new book : ", JSON.stringify(books))
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(books))
    }
})

app.post('/delete', function(req, res) {
    console.log("Inside Delete Post Request");
    console.log(req.body);
    let theBookID = req.body.BookID;
    let isExist = false;

    console.log("Request Body: ", req.body);
    console.log("The BookID: ", theBookID);
    if (books.map(x => x["BookID"]).includes(theBookID)) {
        console.log("Found The BookID !");
        isExist = true;
        books = books.filter((book) => book.BookID != theBookID);
        console.log("After books = ", books);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(books));
    }

    if (!isExist) {
        console.log("Couldn't find The BookID !");
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        })
        res.end("The BookID doesn't exist ! Try with existing ID !")
    }
})

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");