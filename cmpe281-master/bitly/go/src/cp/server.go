/*
	Gumball API in Go (Version 1)
	Basic Version with no Backend Services
*/

package main

import (
	"net/http"
	"encoding/json"
    "log"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
)

// NewServer configures and returns a Server.
func NewServer() *negroni.Negroni {
	formatter := render.New(render.Options{
		IndentJSON: true,
	})
	n := negroni.Classic()
	mx := mux.NewRouter()
	initRoutes(mx, formatter)
	n.UseHandler(mx)
	return n
}

// API Routes
func initRoutes(mx *mux.Router, formatter *render.Render) {
    mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	mx.HandleFunc("/link", shorteningLinkHandler(formatter)).Methods("POST")
}

// API Ping Handler
func pingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
	}
}

// Shortening Link
func shorteningLinkHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

        // Parse request body
        var o originalLink
        _ = json.NewDecoder(req.Body).Decode(&o)
        // TODO: Put user_pk if any

        var shortenLink shortenedLink = shortenLink(o)

        log.Println("Shortened Link: ", shortenLink)

        // Publish Event to Message Queue
        message, _ := json.Marshal(shortenLink)
        publishMessage(ch, q, message)

        formatter.JSON(w, http.StatusOK, shortenLink)
	}
}

