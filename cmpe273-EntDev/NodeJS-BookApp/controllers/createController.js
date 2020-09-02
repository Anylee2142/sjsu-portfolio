module.exports = (app) => {
    var booksLoader = require('../index');

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
            console.log("Request", req.body);
            let { BookID, Title, Author } = req.body;
            let ErrorMessage = "";
            let books = booksLoader.books();

            // Check if unique BookID
            if (books.map(x => x["BookID"]).includes(BookID)) {
                ErrorMessage = `Same BookID ${BookID} exists, Try with another unique ID`;
            }
            else {
                books.push({
                    "BookID": req.body.BookID,
                    "Title": req.body.Title,
                    "Author": req.body.Author
                });
                books.sort((a, b) => a.BookID < b.BookID ? -1 : 1);
            }

            res.render('home', {
                books: books,
                ErrorMessage: ErrorMessage
            });
        }
    });
}