module.exports = (app) => {
    var booksLoader = require('../resources/booksResource');

    app.get('/delete', function (req, res) {
        console.log("Session Data : ", req.session.user);
        if (!req.session.user) {
            res.redirect('/');
        } else
            res.render('delete', {
                books: booksLoader.books()
            });
    });

    app.post('/delete', function (req, res) {
        if (!req.session.user) {
            res.redirect('/');
        } else {
            console.log("Request", req.body);
            let deletedBookID = req.body.dropdown;
            let ErrorMessage = "";
            let books = booksLoader.books();

            if (books.map(x => x["BookID"]).includes(deletedBookID)) {
                books = books.filter((book) => book.BookID != deletedBookID)
                booksLoader.setBooks(books)
            } else
                ErrorMessage = `The BookID ${deletedBookID} doesn't exist. Try an existing ID`;

            res.render('home', {
                books: books,
                ErrorMessage: ErrorMessage
            });
        }
    });
}