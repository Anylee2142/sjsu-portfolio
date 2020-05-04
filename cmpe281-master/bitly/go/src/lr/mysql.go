
package main

import (
    "log"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

// var mysql_connect = "root:cmpe281@tcp(localhost:3306)/cmpe281"
// var mysql_connect = "root:cmpe281@tcp(mysql:3306)/cmpe281"
var mysql_connect string

func insertToMySQL(res shortenedLink) {

	db, err := sql.Open("mysql", mysql_connect)
	errorLogging(err, "Failed to Connect to MySQL")
	defer db.Close()

	// Prepare statement for inserting data
	stmtIns, err := db.Prepare("INSERT INTO Link(`link_uuid`, `original_link`, `shortened_link`, `create_time`) VALUES( ?, ?, ?, ? )") // ? = placeholder
	errorLogging(err, "Failed to Prepare Insert Statement")
	defer stmtIns.Close() // Close the statement when we leave main() / the program terminates

    _, err = stmtIns.Exec(res.Uuid, res.Original, res.Shortened, res.Time)
    errorLogging(err, "Failed to Execute the Insert Statement !")

    log.Println("Insert To MySQL URL:>", mysql_connect,
    "\n\tInserting :", res)
}

func fetchFromMySQL(shortened_link string) (string, error) {
	db, err := sql.Open("mysql", mysql_connect)
    errorLogging(err, "Failed to Connect to MySQL")
	defer db.Close()

	// Prepare statement for reading data
	stmtOut, err := db.Prepare("SELECT original_link FROM Link WHERE shortened_link = ?")
    errorLogging(err, "Failed to Prepare Select Statement")
	defer stmtOut.Close()

    var original_link string

	err = stmtOut.QueryRow(shortened_link).Scan(&original_link)
	errorLogging(err, "Failed to Execute Select Query")
	log.Println("Fetch from MySQL URL:>", mysql_connect)
	if err != nil {
	    log.Println("\tError while querying")
	    return "", err
	} else {
	    log.Println("\tSelected Original Link: " +original_link)
	    return original_link, nil
	}

}