const util = require('util');

module.exports = (app, conn) => {
    // conn.connect(); // Testing DB connection
    const query = util.promisify(conn.query).bind(conn);

    app.get('/reviews/:res_pk', (req, res) => {
        console.log("@@@ Inside Reviews GET request !");

        let selectStatement = `SELECT *
        FROM reviews INNER JOIN users ON reviews.user_pk = users.user_pk
        WHERE reviews.res_pk=${req.params.res_pk}`;
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
                console.log("Error has been catched when fetching reviews !", e);
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })

                res.end("Something went wrong !");

            }
        })();
    });

    app.post('/reviews', (req, res) => {
        console.log("@@@ Inside Reviews POST request !");

        let insertStatement = `INSERT INTO reviews(user_pk, res_pk, content, rating, post_date)
        VALUES("${req.body.user_pk}", "${req.body.res_pk}", "${req.body.content}", ${req.body.rating}, "${req.body.post_date}")`;

        (async () => {
            try {
                await query(insertStatement);
                res.writeHead(200, {
                    'Content-Type': "text/plain"
                })
                res.end("Succesful reviews insert !!")
                console.log("Succesful reviews insert !!")
            } catch (e) {
                console.log("Error has been catched when inserting reviews !", e);
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })

                res.end("Something went wrong !");

            }
        })();
    });
};
