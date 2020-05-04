/*
	Gumball API in Go (Version 1)
	Basic Version with no Backend Services
*/
	
package main

import (
	"os"
)


func main() {

	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "3001"
	}

    rabbitmq_connect = os.Getenv("RABBITMQ_URL")
    if len(rabbitmq_connect) == 0 {
        rabbitmq_connect = "amqp://guest:guest@rabbitmq:5672/"
    }


    nosql_connect = os.Getenv("NOSQL_URL")
    if len(nosql_connect) == 0 {
        nosql_connect = "http://api_node_1:9090/"
    }

    mysql_connect = os.Getenv("MYSQL_URL")
    if len(mysql_connect) == 0 {
        mysql_connect = "root:cmpe281@tcp(mysql:3306)/cmpe281"
    }

    conn = openConnection(rabbitmq_connect)
    ch  = openChannel(conn)
    q  = declareAndGetQueue(ch)
    msgs  = getMessages(ch, q)

	server := NewServer()
	server.Run(":" + port)
}
