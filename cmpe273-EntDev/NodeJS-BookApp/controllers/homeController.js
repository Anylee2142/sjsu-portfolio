module.exports = (app) => {
    var booksLoader = require('../resources/booksResource');

    app.get('/home', function (req, res) {
        if (!req.session.user) {
            res.redirect('/');
        } else {
            console.log("Session data : ", req.session);
            res.render('home', {
                books: booksLoader.books(),
                ErrorMessage: ""
            });
        }
    });
}