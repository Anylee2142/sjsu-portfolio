/*
	Gumball API in Go (Version 1)
	Basic Version with no Backend Services
*/

package main

import (
	"log"
	"net/http"
	"encoding/json"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
)

// NewServer configures, receive message from subscribed queue, and returns a Server.
func NewServer() *negroni.Negroni {
	formatter := render.New(render.Options{
		IndentJSON: true,
	})
	n := negroni.Classic()
	mx := mux.NewRouter()
	initRoutes(mx, formatter)

    // Consuming Events from Message Queue
    // And Process proper tasks
	eventHandlingForMessageQueue()

	n.UseHandler(mx)
	return n
}

func eventHandlingForMessageQueue() {

    go func() {
            for d := range msgs {
              bytes := []byte(d.Body)
              var res shortenedLink
              json.Unmarshal(bytes, &res)
              log.Printf("Received a message from Message Queue: %s", res)

              // 2. Put in Cache (NoSQL)
              safeGo(func() { cacheToNoSQL(res) })

              // 3. Put in Main Database (MySQL)
              safeGo(func() { insertToMySQL(res) } )
            }
          }()
}

func receiveMessageFromQueueXXX() {
    // other topic
}

// API Routes
func initRoutes(mx *mux.Router, formatter *render.Render) {
    mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	mx.HandleFunc("/test", testRedirectHandler(formatter)).Methods("GET")
	mx.HandleFunc("/{shortenedLink}", redirectionHandler(formatter)).Methods("GET")
}

// API Ping Handler
func pingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
	}
}

// Redirect Test
func testRedirectHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
// 		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
		http.Redirect(w, req, "http://www.google.com", 307)
	}
}

// Redirection
func redirectionHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		shortened_link := params["shortenedLink"]
        log.Println("Shortened link : " + shortened_link)
        var original_link string

        // First, Fetch from Cache
		res, err := fetchFromNoSQL(shortened_link)
        if err != nil {
            // If there's no record from NoSQL, then fetch it from MySQL
            res1, err1 := fetchFromMySQL(shortened_link)
            if err1 != nil {
                // If no both NoSQL and MySQL, then return 404
                formatter.JSON(w, http.StatusNotFound, nil)
            }
            original_link = res1
        } else {
            original_link = res.Original
        }

        // Put `Click` event history in NoSQL
        if err == nil { insertHistoryToNoSQL(res) }

        log.Println("Original Link: ", original_link)
		http.Redirect(w, req, original_link, 307)
	}
}
