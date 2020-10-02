const util = require('util');

const selectStatementQuery = (argumentObject) => {
    let selectStatement = `SELECT * FROM users 
    WHERE email="${argumentObject.emailID}" and password="${argumentObject.password}";`;

    return selectStatement;
}

const insertStatementQuery = (argumentObject) => {
    let insertStatement = `INSERT INTO users(name, email, password)
    VALUES("${argumentObject.name}", "${argumentObject.emailID}", "${argumentObject.password}");`;

    return insertStatement;
}

const updateStatementQuery = (argumentObject, userPrimaryKey) => {
    let updateStatementHead = `UPDATE users `
    let updateStatementBody = `SET `;
    for (const [index, [key, value]] of Object.entries(Object.entries(argumentObject))) {
        updateStatementBody += `${key} = "${value}"`;
        if (index < Object.keys(argumentObject).length -1 ){
            updateStatementBody += ", ";
        }
      }
    let updateStatementTail = ` WHERE user_pk = "${userPrimaryKey}";`;

    return updateStatementHead + updateStatementBody + updateStatementTail;
}

module.exports = (app, conn) => {
    // conn.connect(); // Testing DB connection
    const query = util.promisify(conn.query).bind(conn);

    // Signup
    app.post('/user', (req, res) => {
        // req.params == id
        // req.body == user input
        console.log("@@@ Inside User Create request !");
        let insertStatement = insertStatementQuery(req.body);
        console.log(insertStatement);

        (async () => {
            try {
                rows = await query(insertStatement);
                res.writeHead(200, {
                    'Content-Type': "application/json"
                })
                res.end("Successfully created the User !");
                console.log("Succesful create !")
            } catch (e) {
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
    app.post('/user/login', (req, res) => {
        // req.body = user input
        // make INSERT Statement
        console.log("@@@ Inside User Login request !");
        let selectStatement = selectStatementQuery(req.body);
        console.log(selectStatement);

        let rows;
        (async () => {
            try {
                rows = await query(selectStatement);
                console.log("Searched tuples = ", rows);
                if (rows.length >= 2) {
                    throw "Multiple user searched with one email";
                } else if (rows.length == 0) {
                    throw "Check your ID or PASSWORD, and Try Again !";
                }
                res.cookie('userCookie', rows[0].user_pk, { maxAge: 900000, httpOnly: false, path: '/' });
                res.writeHead(200, {
                    'Content-Type': "application/json"
                })
                res.end(JSON.stringify(rows))
                console.log("Succesful login !")
            } catch (e) {
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
    app.put('/user/:user_pk', (req, res) => {
        console.log("@@@ Inside User Update request !");
        console.log("User ID to update = ", req.params);
        console.log("Updated field = ", req.body);

        let updateStatement = updateStatementQuery(req.body, req.params.user_pk);
        console.log(updateStatement);

        (async () => {
            try {
                rows = await query(updateStatement);
                res.writeHead(200, {
                    'Content-Type': "application/json"
                });
                res.end("Succesful update !");
                console.log("Succesful update !")
            } catch (e) {
                console.log("Error has been catched when user update !", e);
                rows = [];
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })
                res.end(e);
            }
        })();
    });


    // // Profile view
    // app.get('/user', (req, res) => {
    //     // req.query
    //     // make SELECT Statement
    //     let selectStatement = "SELECT * FROM user";
    //     let rows = queryFunction(query, selectStatement, conn);
    //     // Redirect
    // });
};
