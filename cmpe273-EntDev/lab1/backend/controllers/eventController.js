const util = require('util');

// const selectStatementQuery = (argumentObject) => {
//     let selectStatement = `SELECT * FROM users 
//     WHERE email="${argumentObject.emailID}" and password="${argumentObject.password}";`;

//     return selectStatement;
// }

const insertStatementQuery = (argumentObject) => {
    let insertStatement = `INSERT INTO eventRegister(user_pk, event_pk, res_pk)
    VALUES("${argumentObject.user_pk}", "${argumentObject.event_pk}", "${argumentObject.res_pk}");`;

    return insertStatement;
}

// const updateStatementQuery = (argumentObject, userPrimaryKey) => {
//     let updateStatementHead = `UPDATE users `
//     let updateStatementBody = `SET `;
//     for (const [index, [key, value]] of Object.entries(Object.entries(argumentObject))) {
//         updateStatementBody += `${key} = "${value}"`;
//         if (index < Object.keys(argumentObject).length -1 ){
//             updateStatementBody += ", ";
//         }
//       }
//     let updateStatementTail = ` WHERE user_pk = "${userPrimaryKey}";`;

//     return updateStatementHead + updateStatementBody + updateStatementTail;
// }

module.exports = (app, conn) => {
    // conn.connect(); // Testing DB connection
    const query = util.promisify(conn.query).bind(conn);

    // // Register to event
    app.post('/eventRegisters', (req, res) => {
        // req.body = user input
        // make INSERT Statement
        console.log("@@@ Inside Event Register create request !");
        let insertStatement = insertStatementQuery(req.body);
        console.log(insertStatement);

        let rows;
        (async () => {
            try {
                rows = await query(insertStatement);
                res.writeHead(200, {
                    'Content-Type': "application/json"
                })
                res.end(JSON.stringify(rows))
                console.log("Succesful Event Register !")
            } catch (e) {
                console.log("Error has been catched when event register !", e);
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })
                if (e.code === "ER_DUP_ENTRY") {
                    res.end("You already registered to this event !");
                }
                else {
                    res.end("Something went wrong !");
                }
            }
        })();
    });

    // Retrieve all the events
    app.get('/events', (req, res) => {
        // req.body = user input
        // make INSERT Statement
        console.log("@@@ Inside Events GET request !");
        let selectStatement = `SELECT events.*, restaurants.name as res_name
        FROM events INNER JOIN restaurants ON events.res_pk = restaurants.res_pk`;
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
                console.log("Error has been catched when fetching events !", e);
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })

                res.end("Something went wrong !");

            }
        })();
    });
};
