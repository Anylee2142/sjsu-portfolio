const util = require('util');

const insertStatementQuery = (argumentObject) => {
    let insertStatement = `
    INSERT INTO menus(
        name, price, 
        ingredient, menu_desc,
        category, res_pk
        )
    VALUES(
        "${argumentObject.name}", "${argumentObject.price}",
        "${argumentObject.ingredient}", "${argumentObject.menu_desc}",
        "${argumentObject.category}", "${argumentObject.res_pk}"
        );`;

    return insertStatement;
}

const updateStatementQuery = (argumentObject, menuPrimaryKey) => {
    let updateStatementHead = `UPDATE menus `
    let updateStatementBody = `SET `;
    for (const [index, [key, value]] of Object.entries(Object.entries(argumentObject))) {
        let colons = (value === true || value === false) ? "" : "\"";
        updateStatementBody += `${key} = ${colons}${value}${colons}`;
        if (index < Object.keys(argumentObject).length - 1) {
            updateStatementBody += ", ";
        }
    }
    let updateStatementTail = ` WHERE menu_pk = "${menuPrimaryKey}";`;

    return updateStatementHead + updateStatementBody + updateStatementTail;
}

module.exports = (app, conn) => {
    // conn.connect(); // Testing DB connection
    const query = util.promisify(conn.query).bind(conn);

    // Modify
    app.put('/menus/:menu_pk', (req, res) => {
        console.log("@@@ Inside restaurant Update request !");
        console.log("RES ID to update = ", req.params);
        console.log("Updated field = ", req.body);

        let updateStatement = updateStatementQuery(req.body, req.params.menu_pk);
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

    // Signup
    app.post('/menus', (req, res) => {
        // req.params == id
        // req.body == user input
        console.log("@@@ Inside Menu create request !");
        let insertStatement = insertStatementQuery(req.body);
        console.log(insertStatement);

        (async () => {
            try {
                rows = await query(insertStatement);
                res.writeHead(200, {
                    'Content-Type': "application/json"
                })
                res.end("Successfully created the menu !");
                console.log("Succesful menu create !")
            } catch (e) {
                console.log("Error has been catched when menu create !", e);
                rows = [];
                // TODO = Switch statement here with proper http code with messages each case
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })
                if (e.code === "ER_DUP_ENTRY") {
                    res.end("The menu already exists! Try another name !");
                }
            }
        })();

    });

    app.get('/menus/:res_pk', (req, res) => {
        console.log("@@@ Inside Menus GET request !");

        let selectStatement = `SELECT * FROM menus WHERE menus.res_pk=${req.params.res_pk}`;
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
                console.log("Succesful Menus fetch !!")
            } catch (e) {
                console.log("Error has been catched when fetching orders !", e);
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })

                res.end("Something went wrong !");

            }
        })();
    });
};
