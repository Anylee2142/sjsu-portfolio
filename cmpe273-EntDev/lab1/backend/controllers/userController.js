const util = require('util');

let queryFunction = (query, sqlStatement, conn) => {
    let rows;
    (async () => {
        try {
            console.log('first here')
            rows = await query(sqlStatement);
            console.log(rows);
        } catch(e) {
            console.log(e)
            rows = "";
        } finally {
            // 
        }
    })();

    return rows;
}

module.exports = (app, conn) => {
    // conn.connect(); // Testing DB connection
    const query = util.promisify(conn.query).bind(conn);

    app.put('/user/:id', (req, res) => {
        // req.params == id
        // req.body == user input
        let updateStatement = "";
        let rows = queryFunction(query, updateStatement, conn);
        // Redirect
    });

    // Signup
    app.post('/user', (req, res) => {
        // req.body = user input
        // make INSERT Statement
        let insertStatement = "";
        let rows = queryFunction(query, insertStatement, conn);
        // Redirect
    });

    // Profile view
    app.get('/user', (req, res) => {
        // req.query
        // make SELECT Statement
        let selectStatement = "SELECT * FROM user";
        let rows = queryFunction(query, selectStatement, conn);
        // Redirect
    });
};
