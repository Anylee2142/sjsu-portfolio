const util = require('util');

const selectStatementQuery = (keyword) => {

    let selectStatement = `SELECT DISTINCT restaurants.name, restaurants.avg_rating, restaurants.phone_number, 
    restaurants.type_of_food, restaurants.city, restaurants.state, restaurants.res_desc,
    restaurants.is_dine_in_possible, restaurants.is_pickup_possible, restaurants.is_delivery_possible, res_long, res_lat
    FROM restaurants INNER JOIN menus ON restaurants.res_pk = menus.res_pk `;

    if (!keyword.includes("delivery") && !keyword.includes("pickup") && !keyword.includes("dinein")) {
        selectStatement += `WHERE
        restaurants.name LIKE "%${keyword}%"
        OR menus.name LIKE "%${keyword}%" 
        OR type_of_food LIKE "%${keyword}%" 
        OR city LIKE "%${keyword}%"
        OR state LIKE "%${keyword}%";`;
    } else {
        if (keyword.includes("delivery")) {
            selectStatement += `WHERE
            restaurants.is_delivery_possible = true;
            `;
        } else if(keyword.includes("pickup")) {
            selectStatement += `WHERE
            restaurants.is_pickup_possible = true;
            `;
        } else if(keyword.includes("dinein")) {
            selectStatement += `WHERE
            restaurants.is_dine_in_possible = true;
            `;
        }
    }

    return selectStatement
}

module.exports = (app, conn) => {
    // conn.connect(); // Testing DB connection
    const query = util.promisify(conn.query).bind(conn);

    // Fetch the orders user have made
    app.get('/search', (req, res) => {
        console.log("@@@ Inside Restaurants GET request !");
        // let selectStatement = `SELECT *
        // FROM eventRegister INNER JOIN events ON eventRegister.event_pk = events.event_pk
        // WHERE user_pk="${userPrimaryKey}";`;

        let selectStatement = selectStatementQuery(req.query.keyword);
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
                console.log("Succesful Search !!")
            } catch (e) {
                console.log("Error has been catched when searching restaurants !", e);
                res.writeHead(500, {
                    'Content-Type': "text/plain"
                })

                res.end("Something went wrong !");
            }
        })();
    });
};
