const util = require('util');

module.exports = (app, conn) => {
    // conn.connect(); // Testing DB connection
    const query = util.promisify(conn.query).bind(conn);

    // Fetch the orders user have made
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
};
