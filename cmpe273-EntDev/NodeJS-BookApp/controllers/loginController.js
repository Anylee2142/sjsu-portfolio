module.exports = (app) => {
    var UsersLoader = require('../resources/usersResource');

    app.get('/login', function (req, res) {
        res.redirect("/")
    });

    app.post('/login', function (req, res) {
        if (req.session.user) {
            res.redirect("/home");
        } else {
            let isMember = false
            console.log("Req Body : ", req.body);
            UsersLoader.Users().filter(user => {
                if (user.username === req.body.username && user.password === req.body.password) {
                    req.session.user = user;
                    isMember = true
                    res.redirect('/home');
                }
            });

            if (!isMember) {
                res.render("login", {
                    ErrorMessage: "Your ID or Password is wrong. Try again"
                });
            }
        }
    });
}