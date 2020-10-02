const util = require('util');

const selectStatementQuery = (argumentObject) => {
    let selectStatement = `SELECT * FROM restaurants 
    WHERE email="${argumentObject.emailID}" and password="${argumentObject.password}";`;

    return selectStatement;
}

const insertStatementQuery = (argumentObject) => {
    let insertStatement = `INSERT INTO restaurants(name, email, password,
        city, state,
        res_long, res_lat)
    VALUES("${argumentObject.name}", "${argumentObject.emailID}", "${argumentObject.password}",
    "${argumentObject.city}", "${argumentObject.state}",
    "${argumentObject.res_long}", "${argumentObject.res_lat}");`;

    return insertStatement;
}

const updateStatementQuery = (argumentObject, restaurantPrimaryKey) => {
    let updateStatementHead = `UPDATE restaurants `
    let updateStatementBody = `SET `;
    for (const [index, [key, value]] of Object.entries(Object.entries(argumentObject))) {
        let colons = (value === true || value === false) ? "" : "\"";
        updateStatementBody += `${key} = ${colons}${value}${colons}`;
        if (index < Object.keys(argumentObject).length - 1) {
            updateStatementBody += ", ";
        }
    }
    let updateStatementTail = ` WHERE res_pk = "${restaurantPrimaryKey}";`;

    return updateStatementHead + updateStatementBody + updateStatementTail;
}

module.exports = (app, conn) => {
    // conn.connect(); // Testing DB connection
    const query = util.promisify(conn.query).bind(conn);

    app.post("/restaurants", (req, res) => {
        // req.params == id
        // req.body == user input
        console.log("@@@ Inside Restaurant Create request !");
        let insertStatement = insertStatementQuery(req.body);
        console.log(insertStatement);

        (async () => {
            try {
                rows = await query(insertStatement);
                res.writeHead(200, {
                    'Content-Type': "application/json"
                })
                res.end("Successfully created the Restaurant !");
                console.log("Succesful create !")
            } catch (e) {
                console.log("Error has been catched when Restaurant create !", e);
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

    app.get('/restaurants', (req, res) => {
        console.log("@@@ Inside Restaurants GET request !");

        let selectStatement = `SELECT * FROM restaurants`;
        console.log(selectStatement);

        let rows;
        (async () => {
            try {
                rows = await query(selectStatement);
                console.log("Searched tuples = ", rows);
                res.writeHead(200, {
                    'Content-Type': "application/json"
                })
                res.end(JSON.stringify(rows))
                console.log("Succesful Fetches !")
            } catch (e) {
                console.log("Error has been catched when fetching orders !", e);
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })

                res.end("Something went wrong !");

            }
        })();
    });

    app.post("/restaurants/login", (req, res) => {
        // req.body = user input
        // make INSERT Statement
        console.log("@@@ Inside Restaurant Login request !");
        let selectStatement = selectStatementQuery(req.body);
        console.log(selectStatement);

        let rows;
        (async () => {
            try {
                rows = await query(selectStatement);
                console.log("Searched tuples = ", rows);
                if (rows.length >= 2) {
                    throw "Multiple restaurants searched with one email";
                } else if (rows.length == 0) {
                    throw "Check your ID or PASSWORD, and Try Again !";
                }
                res.cookie('restaurantCookie', rows[0].user_pk, { maxAge: 900000, httpOnly: false, path: '/' });
                res.writeHead(200, {
                    'Content-Type': "application/json"
                })
                res.end(JSON.stringify(rows))
                console.log("Succesful login !")
            } catch (e) {
                console.log("Error has been catched when restaurant login !", e);
                rows = [];
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })
                res.end(e);
            }
        })();
    });

    // Modify
    app.put('/restaurants/:res_pk', (req, res) => {
        console.log("@@@ Inside restaurant Update request !");
        console.log("RES ID to update = ", req.params);
        console.log("Updated field = ", req.body);

        let updateStatement = updateStatementQuery(req.body, req.params.res_pk);
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
                console.log("Error has been catched when Restaurant update !", e);
                rows = [];
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })
                res.end(e);
            }
        })();
    });
};
