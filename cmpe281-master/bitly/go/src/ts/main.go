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
		port = "3002"
	}

    nosql_connect = os.Getenv("NOSQL_URL")
    if len(nosql_connect) == 0 {
        nosql_connect = "http://api_node_1:9090/"
    }

	server := NewServer()
	server.Run(":" + port)
}
