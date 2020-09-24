const util = require('util');

module.exports = (app, conn) => {
    // conn.connect(); // Testing DB connection
    const query = util.promisify(conn.query).bind(conn);

    // Signup
    app.put('/user/', (req, res) => {
        // req.params == id
        // req.body == user input
        let insertStatement = `INSERT INTO users(name, email, password)
        VALUES("${req.body.name}", "${req.body.emailID}", "${req.body.password}")`;

        (async () => {
            try {
                rows = await query(insertStatement);
                res.writeHead(200, {
                    'Content-Type': "application/json"
                })
                res.end("Successfully created the User !");
                console.log("Succesful create !")
            } catch(e) {
                console.log("Error has been catched when user create !", e);
                rows = [];
                // TODO = Switch statement here with proper http code with messages each case
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })
                if (e.code === "ER_DUP_ENTRY") {
                    res.end("The email already exists! Try another one !");
                }
            }
        })();
                
    });

    // // login
    app.post('/user', (req, res) => {
        // req.body = user input
        // make INSERT Statement
        let insertStatement = `SELECT * FROM users 
        WHERE email="${req.body.emailID}" and password="${req.body.password}"`;
        let rows;
        (async () => {
            try {
                rows = await query(insertStatement);
                console.log("Searched tuples = ",rows);
                if (rows.length >=2){
                    throw "Multiple user searched with one email";
                } else if (rows.length == 0){
                    throw "Check your ID or PASSWORD, and Try Again !";
                }
                res.cookie('cookie', rows[0].user_pk, { maxAge: 900000, httpOnly: false, path: '/' });
                res.writeHead(200, {
                    'Content-Type': "application/json"
                })
                res.end(JSON.stringify(rows))
                console.log("Succesful login !")
            } catch(e) {
                console.log("Error has been catched when user login !", e);
                rows = [];
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })
                res.end(e);
            } 
        })();
    });

    // Modify
    // app.post('/user/:id')

    // Profile view
    app.get('/user', (req, res) => {
        // req.query
        // make SELECT Statement
        let selectStatement = "SELECT * FROM user";
        let rows = queryFunction(query, selectStatement, conn);
        // Redirect
    });
};
