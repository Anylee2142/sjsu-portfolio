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
		port = "3000"
	}

    rabbitmq_connect = os.Getenv("RABBITMQ_URL")
    if len(rabbitmq_connect) == 0 {
        rabbitmq_connect = "amqp://guest:guest@rabbitmq:5672/"
    }

    conn = openConnection(rabbitmq_connect)
    ch = openChannel(conn)
    q = declareAndGetQueue(ch)

	server := NewServer()
	server.Run(":" + port)
}
