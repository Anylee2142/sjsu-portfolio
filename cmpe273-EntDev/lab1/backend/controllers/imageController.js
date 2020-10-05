var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        let fileName = null;
        console.log(req.params);
        if (req.params.user_pk) fileName = `user_${req.params.user_pk}_profile.png`;
        else if (req.params.res_pk) fileName = `restaurant_${req.params.res_pk}_profile.png`;
        else if (req.params.menu_pk) fileName = `menu_${req.params.menu_pk}_profile.png`;
        cb(null, fileName)
    }
})
var upload = multer({ storage: storage }).single('file')

module.exports = (app) => {
    app.post("/images/users/:user_pk", (req, res) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).send(req.file);
        })
    });

    app.post("/images/restaurants/:res_pk", (req, res) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).send(req.file);
        })
    });

    app.post("/images/menus/:menu_pk", (req, res) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).send(req.file);
        })
    });
};
