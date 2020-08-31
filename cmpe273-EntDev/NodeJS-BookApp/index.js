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

app.get('/login', function (req, res){
    res.redirect("/")
})

app.post('/login', function (req, res) {
    if (req.session.user) {
        res.redirect("/home")
    } else {
        let isMember = false
        console.log("Req Body : ", req.body);
        Users.filter(user => {
            if (user.username === req.body.username && user.password === req.body.password) {
                req.session.user = user;
                isMember = true
                res.redirect('/home');
            }
        });

        if (!isMember) {
            res.render("login", {
                ErrorMessage: "Your ID or Password is wrong. Try again"
            })
        }
        
    }
});

app.get('/home', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        console.log("Session data : ", req.session);
        res.render('home', {
            books: books,
            ErrorMessage: ""
        });
    }
});

app.get('/create', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else 
        res.render('create');
    
});

app.post('/create', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        console.log("Request", req.body)
        let {BookID, Title, Author} = req.body
        let ErrorMessage = ""

        // Check if unique BookID
        if (books.map(x => x["BookID"]).includes(BookID)) {
            ErrorMessage = `Same BookID ${BookID} exists, Try with another unique ID`
        }
        else {
            books.push({
                "BookID": req.body.BookID,
                "Title": req.body.Title,
                "Author": req.body.Author
            })
        }

        res.render('home', {
            books: books,
            ErrorMessage: ErrorMessage 
        })
    }
});

app.get('/delete', function (req, res) {
    console.log("Session Data : ", req.session.user);
    if (!req.session.user) {
        res.redirect('/');
    } else 
        res.render('delete', {
            books: books
        });
    
});

app.post('/delete', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        console.log("Request", req.body)
        let deletedBookID = req.body.dropdown
        let ErrorMessage = ""

        if (books.map(x => x["BookID"]).includes(deletedBookID)) {
            books = books.filter((book) => {
                return book.BookID != deletedBookID
            })
        } else 
            ErrorMessage = `The BookID ${deletedBookID} doesn't exist. Try an existing ID`

        res.render('home', {
            books: books,
            ErrorMessage: ErrorMessage
        })
    }
})

var server = app.listen(3000, function () {
    console.log("Server listening on port 3000");
});