module.exports = (app) => {
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
}