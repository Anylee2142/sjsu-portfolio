const util = require('util');

const selectStatementQuery = (userPrimaryKey) => {
    let selectStatement = `SELECT *
    FROM eventRegister INNER JOIN events ON eventRegister.event_pk = events.event_pk
    WHERE user_pk="${userPrimaryKey}";`;

    return selectStatement;
}

const insertStatementQuery = (argumentObject) => {
    let insertStatement = `INSERT INTO eventRegister(user_pk, event_pk, res_pk)
    VALUES("${argumentObject.user_pk}", "${argumentObject.event_pk}", "${argumentObject.res_pk}");`;

    return insertStatement;
}

module.exports = (app, conn) => {
    // conn.connect(); // Testing DB connection
    const query = util.promisify(conn.query).bind(conn);

    // // // Create new order
    // app.post('/eventRegisters', (req, res) => {
    //     // req.body = user input
    //     // make INSERT Statement
    //     console.log("@@@ Inside Event Register create request !");
    //     let insertStatement = insertStatementQuery(req.body);
    //     console.log(insertStatement);

    //     let rows;
    //     (async () => {
    //         try {
    //             rows = await query(insertStatement);
    //             res.writeHead(200, {
    //                 'Content-Type': "application/json"
    //             })
    //             res.end(JSON.stringify(rows))
    //             console.log("Succesful Event Register !")
    //         } catch (e) {
    //             console.log("Error has been catched when event register !", e);
    //             res.writeHead(500, {
    //                 'Content-Type': "text/plain"
    //             })
    //             if (e.code === "ER_DUP_ENTRY") {
    //                 res.end("You already registered to this event !");
    //             }
    //             else {
    //                 res.end("Something went wrong !");
    //             }
    //         }
    //     })();
    // });

    // // // Fetch all the orders user have made
    // app.get('/eventRegisters/:user_pk', (req, res) => {
    //     // req.body = user input
    //     // make INSERT Statement
    //     console.log("@@@ Inside Registered Event get request !");
    //     console.log("User ID to update = ", req.params);
    //     console.log("Updated field = ", req.body);
    //     let selectStatement = selectStatementQuery(req.params.user_pk);
    //     console.log(selectStatement);

    //     let rows;
    //     (async () => {
    //         try {
    //             rows = await query(selectStatement);
    //             res.writeHead(200, {
    //                 'Content-Type': "application/json"
    //             })
    //             res.end(JSON.stringify(rows))
    //             console.log("Succesful on retrieving Registered Event!")
    //         } catch (e) {
    //             console.log("Error has been catched on retrieving Registered Event!", e);
    //             res.writeHead(500, {
    //                 'Content-Type': "text/plain"
    //             })
    //             if (e.code === "ER_DUP_ENTRY") {
    //                 res.end("You already registered to this event !");
    //             }
    //             else {
    //                 res.end("Something went wrong !");
    //             }
    //         }
    //     })();
    // });

    // Fetch the orders user have made
    app.get('/orders/:user_pk', (req, res) => {
        // /orders?user_pk=M&res_pk=N
        // req.query.user_pk
        // req.query.res_pk

        console.log("@@@ Inside Orders GET request !");

        let selectStatement = `SELECT orders.*, restaurants.name as res_name, restaurants.avg_rating as res_avg_rating
        FROM orders INNER JOIN restaurants ON orders.res_pk = restaurants.res_pk
        WHERE user_pk="${req.params.user_pk}"`;
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
};
