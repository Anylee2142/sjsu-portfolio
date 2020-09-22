let mysql = require("mysql");
let connection = mysql.createConnection({
    host: "localhost",
    user: "local_yelp",
    password: "5555",
    database: "yelp"
});

module.exports = {
    mysqlConnection: connection
}