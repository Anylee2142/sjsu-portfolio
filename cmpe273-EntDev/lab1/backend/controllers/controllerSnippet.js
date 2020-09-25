//Route to handle Post Request Call
app.post('/login', function (req, res) {
    console.log("Inside Login Post Request");
    console.log("Req Body : ", req.body);

    let isUser = false;

    Users.filter(function (user) {
        if (user.username === req.body.username && user.password === req.body.password) {
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