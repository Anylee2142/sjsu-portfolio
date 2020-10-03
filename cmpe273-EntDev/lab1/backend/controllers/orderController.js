const util = require('util');

module.exports = (app, conn) => {
    // conn.connect(); // Testing DB connection
    const query = util.promisify(conn.query).bind(conn);

    // Modify
    app.put('/orders/restaurants/:order_pk', (req, res) => {
        console.log("@@@ Inside Order Status Update request !");
        console.log("RES ID to update = ", req.params);
        console.log("Updated field = ", req.body);

        let updateStatement = `UPDATE orders SET order_status="${req.body.order_status}" WHERE order_pk="${req.params.order_pk}"`;
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

    // Fetch the orders user have made
    app.get('/orders/users/:user_pk', (req, res) => {
        // /orders?user_pk=M&res_pk=N
        // req.query.user_pk
        // req.query.res_pk

        console.log("@@@ Inside Orders USER GET request !");

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

    // Fetch the orders user have made
    app.get('/orders/restaurants/:res_pk', (req, res) => {
        // /orders?user_pk=M&res_pk=N
        // req.query.user_pk
        // req.query.res_pk

        console.log("@@@ Inside Orders RES GET request !");

        let selectStatement = `SELECT orders.*, restaurants.name as res_name, restaurants.avg_rating as res_avg_rating, users.*
        FROM orders, restaurants, users WHERE orders.res_pk = restaurants.res_pk and orders.user_pk = users.user_pk
        and restaurants.res_pk="${req.params.res_pk}"`;
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

    // Insert into orders
    app.post("/orders", (req, res) => {
        console.log("@@@ Inside Orders Post Request !");

        let insertStatement = `INSERT INTO orders(
            user_pk, res_pk, order_date,
            food_provide_code, order_status, total_price
        )
        VALUES(
            "${req.body.user_pk}", "${req.body.res_pk}", "${req.body.order_date}",
            "${req.body.food_provide_code}", "${req.body.order_status}", ${req.body.total_price}
        );`;

        let rows;
        (async () => {
            try {
                rows = await query(insertStatement);
                console.log("Searched tuples = ", rows);
                res.writeHead(200, {
                    'Content-Type': "application/json"
                })
                res.end(JSON.stringify(rows))
                console.log("Succesful Insert and Fetches !")
            } catch (e) {
                console.log("Error has been catched when Insert and Fetch orders !", e);
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })

                res.end("Something went wrong !");

            }
        })();
    });

    // Insert into orderMenus
    app.post("/orderMenus", (req, res) => {
        console.log("@@@ Inside OrderMenus Post Request !");
        console.log(req.body);


        let insertStatement = `INSERT INTO orderMenu(
            order_pk, menu_pk,
            qtn, price
        ) VALUES ?;`;

        let rows;
        (async () => {
            try {
                rows = await query(insertStatement, [req.body]);
                console.log("Searched tuples = ", rows);
                res.writeHead(200, {
                    'Content-Type': "application/json"
                })
                res.end(JSON.stringify(rows))
                console.log("Succesful Insert and Fetches !")
            } catch (e) {
                console.log("Error has been catched when Insert and Fetch orders !", e);
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })

                res.end("Something went wrong !");

            }
        })();
    });

    app.get("/orderMenus/users/:user_pk", (req, res) => {
        console.log("@@@ Inside ordermenus USER get request from orders for user !");
        console.log(req.params.order_pk);

        let selectStatement = `SELECT *
        FROM orders, orderMenu, menus WHERE orders.user_pk = "${req.params.user_pk}"
        and orders.order_pk = orderMenu.order_pk and orderMenu.menu_pk=menus.menu_pk;`;
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
                console.log("Succesful Insert and Fetches !")
            } catch (e) {
                console.log("Error has been catched when Insert and Fetch orders !", e);
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })

                res.end("Something went wrong !");

            }
        })();
    });

    app.get("/orderMenus/restaurants/:res_pk", (req, res) => {
        console.log("@@@ Inside ordermenus RES get request from orders for user !");
        console.log(req.params.order_pk);

        let selectStatement = `SELECT *
        FROM orders, orderMenu, menus WHERE orders.res_pk = "${req.params.res_pk}"
        and orders.order_pk = orderMenu.order_pk and orderMenu.menu_pk=menus.menu_pk;`;
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
                console.log("Succesful Insert and Fetches !")
            } catch (e) {
                console.log("Error has been catched when Insert and Fetch orders !", e);
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })

                res.end("Something went wrong !");

            }
        })();
    });
};
